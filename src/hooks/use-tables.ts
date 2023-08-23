import { tablesAtom } from '@/jotai/table-atom';
import {
  Relationship,
  Table,
  extractRelationshipsFromEdges,
  extractRelationshipsFromTables,
  generateRelationshipId,
  getRelationshipsChanges,
  getTablesChanges,
} from '@/lib/table';
import { useAtom } from 'jotai';
import { useNodesAtom } from './use-nodes-atom';
import { useCallback, useEffect } from 'react';
import { useEdgesAtom } from './use-edges-atom';

export function useTables() {
  const [tables, setTables] = useAtom(tablesAtom);
  const { addNode, removeNode, updateNodesFromTables, nodes } = useNodesAtom();

  const { connectEdge, edges, removeEdge } = useEdgesAtom();

  const addTable = useCallback(
    (table: Table) => {
      setTables(prev => [...prev, table]);
      addNode({
        id: table.name,
        position: {
          x: 200,
          y: 200,
        },
        data: table,
      });
    },
    [addNode, setTables],
  );

  const removeTable = useCallback(
    (tableName: string) => {
      setTables(prev => prev.filter(table => table.name !== tableName));
      removeNode(tableName);
    },
    [setTables, removeNode],
  );

  useEffect(() => {
    console.log('use-table.ts');

    const oldTables = nodes.map(node => node.data);

    const oldRelationships = extractRelationshipsFromEdges(edges);

    const newRelationships = extractRelationshipsFromTables(tables);

    const { addedTables, removedTables, updatedTables } = getTablesChanges({
      oldTableArray: oldTables,
      newTableArray: tables,
    });

    const { addedRelationships, removedRelationships } =
      getRelationshipsChanges({
        oldRelationships: oldRelationships,
        newRelationships: newRelationships,
      });

    addedTables.forEach(table => {
      addNode({
        id: table.name,
        position: {
          x: 200,
          y: 200,
        },
        data: table,
      });
    });

    removedTables.forEach(table => removeTable(table.name));

    oldRelationships.forEach(relationship => {
      removeEdge(generateRelationshipId(relationship));
    });

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

    // Only update nodes if necessary
    if (updatedTables.length > 0) {
      updateNodesFromTables(updatedTables);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tables, addNode, removeNode]);

  return {
    tables,
    setTables,
    addTable,
    removeTable,
  };
}
