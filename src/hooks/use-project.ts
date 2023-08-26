import { mirolangAtom } from '@/jotai/miro-lang-atom';
import { Project, currentProjectAtom, projectAtom } from '@/jotai/project-atom';
import { MiroLang } from '@/lib/lang-miro/parser';
import {
  Relationship,
  Table,
  extractRelationshipsFromTables,
  generateRelationshipId,
  getTablesChanges,
  isValidRelationship,
} from '@/lib/table';
import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import { usePathname } from 'next/navigation';
import { db } from '@/lib/db';

type ProjectKey = keyof Project;

export function useProject() {
  const [project, setProjectRaw] = useAtom(projectAtom);
  const [code, setCode] = useAtom(mirolangAtom);
  const [currentProject] = useAtom(currentProjectAtom);

  useEffect(() => {
    if (!currentProject) return;

    db.projects
      .get(currentProject)
      .then(found => {
        if (found) {
          setProjectRaw(found);
          setCode(found.code);
        } else {
          setProjectRaw({
            id: 'example',
            code: '',
            nodes: [],
            edges: [],
            tables: [],
          });
        }
      })
      .catch(err => {
        console.error(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProject]);

  useEffect(() => {
    if (!project) return;

    db.projects.put(project);
  }, [project]);

  // ---- Nodes Handlers ---- //
  const setProject = useCallback(
    <T extends ProjectKey>(
      projectKey: T,
      handler: ((prev: Project[T]) => Project[T]) | Project[T],
    ) => {
      setProjectRaw(prev => {
        if (!prev) return prev;

        if (typeof handler === 'function') {
          const data = handler(prev[projectKey]);
          return {
            ...prev,
            [projectKey]: data,
          };
        } else {
          return {
            ...prev,
            [projectKey]: handler,
          };
        }
      });
    },
    [setProjectRaw],
  );

  const addNode = useCallback(
    (input: Node) => {
      setProject('nodes', prev => [
        ...prev,
        { ...input, type: 'floating-node' },
      ]);
    },
    [setProject],
  );

  const removeNode = useCallback(
    (id: string) => {
      setProject('nodes', prev => prev.filter(node => node.id !== id));
    },
    [setProject],
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setProject('nodes', prev => applyNodeChanges(changes, prev));
    },
    [setProject],
  );

  const updateNodesFromTables = useCallback(
    (tables: Array<Table>) => {
      if (!project) return;

      const updatedNodes = project.nodes.map(node => {
        const updatedTable = tables.find(table => table.name === node.id);
        if (updatedTable) {
          return {
            ...node,
            data: updatedTable,
          };
        }
        return node;
      });

      setProject('nodes', updatedNodes);
    },
    [project, setProject],
  );

  // ---- Edges Handlers ---- //
  const connectEdge = useCallback(
    (params: Edge | Connection) => {
      if (!project) return;

      const relationship: Relationship = {
        source: {
          tableName: params.source!,
          columnName: params.sourceHandle?.split('-')[0] ?? '',
        },
        target: {
          tableName: params.target!,
          columnName: params.targetHandle?.split('-')[0] ?? '',
        },
      };

      if (!isValidRelationship({ relationship, tables: project.tables }))
        return;

      const id = generateRelationshipId(relationship);

      setProject('edges', prev =>
        addEdge(
          { ...params, type: 'button-edge', id, data: relationship },
          prev,
        ),
      );
    },
    [setProject, project],
  );

  const onDragConnect = useCallback(
    (params: Edge | Connection) => {
      console.log('onDragConnect');
      if (!project) return;

      const relationship: Relationship = {
        source: {
          tableName: params.source!,
          columnName: params.sourceHandle?.split('-')[0] ?? '',
        },
        target: {
          tableName: params.target!,
          columnName: params.targetHandle?.split('-')[0] ?? '',
        },
      };

      if (!isValidRelationship({ relationship, tables: project.tables }))
        return;

      const mirolang = new MiroLang(code);

      const updatedWithRelationship = mirolang.addRelationship(relationship);
      console.log('updatedWithRelationship', updatedWithRelationship);

      setCode(prev => updatedWithRelationship ?? prev);
    },
    [project, setCode, code],
  );

  const removeEdge = useCallback(
    (edgeId: string) => {
      if (!project) return;
      setProject('edges', prev => prev.filter(edge => edge.id !== edgeId));

      const mirolang = new MiroLang(code);

      const updatedWithoutRelationship = mirolang.removeRelationship(edgeId);

      setCode(prev => updatedWithoutRelationship ?? prev);
    },
    [project, setProject, setCode, code],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setProject('edges', prev => applyEdgeChanges(changes, prev));
    },
    [setProject],
  );

  // ---- Tables Handlers ---- //
  const addTable = useCallback(
    (table: Table) => {
      setProject('tables', prev => [...prev, table]);
      addNode({
        id: table.name,
        position: {
          x: 200,
          y: 200,
        },
        data: table,
      });
    },
    [addNode, setProject],
  );

  const removeTable = useCallback(
    (tableName: string) => {
      setProject('tables', prev =>
        prev.filter(table => table.name !== tableName),
      );
      removeNode(tableName);
    },
    [setProject, removeNode],
  );

  const handleTableChanges = useCallback(
    (newTables: Table[]) => {
      if (!project) return;

      setProject('tables', newTables);

      const { addedTables, updatedTables, removedTables } = getTablesChanges({
        newTableArray: newTables,
        oldTableArray: project.tables,
      });

      addedTables.forEach(table => {
        addNode({
          id: table.name,
          data: table,
          position: {
            x: 200,
            y: 200,
          },
        });
      });

      removedTables.forEach(table => {
        removeNode(table.name);
      });

      updatedTables.forEach(table => {
        updateNodesFromTables([table]);
      });

      const newRelationships = extractRelationshipsFromTables(newTables);

      newRelationships.forEach(relationship => {
        connectEdge({
          id: generateRelationshipId(relationship),
          source: relationship.source.tableName,
          sourceHandle: `${relationship.source.columnName}-right`,
          target: relationship.target.tableName,
          targetHandle: `${relationship.target.columnName}-left`,
          data: relationship,
          type: 'button-edge',
        });
      });
    },
    [
      project,
      addNode,
      removeNode,
      updateNodesFromTables,
      connectEdge,
      setProject,
    ],
  );

  useEffect(() => {
    console.log('use-table.ts');

    // Parse new tables
    const tables = new MiroLang(code).parse();

    // Handle changes in tables
    handleTableChanges(tables);

    // Update project code
    setProject('code', code);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return {
    project,
    setProject,
    addNode,
    removeNode,
    onNodesChange,
    connectEdge,
    onDragConnect,
    removeEdge,
    onEdgesChange,
    addTable,
    removeTable,
  };
}
