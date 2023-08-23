import { edgesAtom } from '@/jotai/edges-atom';
import { mirolangAtom } from '@/jotai/miro-lang-atom';
import { tablesAtom } from '@/jotai/table-atom';
import { MiroLang } from '@/lib/lang-miro/parser';
import {
  Relationship,
  generateRelationshipId,
  isValidRelationship,
} from '@/lib/table';
import { useAtom } from 'jotai';
import _ from 'lodash';
import { useCallback, useEffect } from 'react';
import {
  Connection,
  Edge,
  EdgeChange,
  addEdge,
  applyEdgeChanges,
} from 'reactflow';

export function useEdgesAtom() {
  const [edges, setEdges] = useAtom(edgesAtom);
  const [tables] = useAtom(tablesAtom);
  const [code, setCode] = useAtom(mirolangAtom);

  const connectEdge = useCallback(
    (params: Edge | Connection) => {
      const relationship: Relationship = {
        source: {
          tableName: params.source!,
          columnName: params.sourceHandle ?? '',
        },
        target: {
          tableName: params.target!,
          columnName: params.targetHandle ?? '',
        },
      };

      if (!isValidRelationship({ relationship, tables })) return;

      const id = generateRelationshipId(relationship);

      setEdges(prev =>
        addEdge(
          { ...params, type: 'button-edge', id, data: relationship },
          prev,
        ),
      );
    },
    [setEdges, tables],
  );

  const onDragConnect = useCallback(
    (params: Edge | Connection) => {
      console.log('onDragConnect');
      const relationship: Relationship = {
        source: {
          tableName: params.source!,
          columnName: params.sourceHandle ?? '',
        },
        target: {
          tableName: params.target!,
          columnName: params.targetHandle ?? '',
        },
      };

      if (!isValidRelationship({ relationship, tables })) return;

      const mirolang = new MiroLang(code);

      const updatedWithRelationship = mirolang.addRelationship(relationship);

      setCode(prev => updatedWithRelationship ?? prev);
    },
    [tables, setCode, code],
  );

  const removeEdge = useCallback(
    (edgeId: string) => {
      setEdges(prev => prev.filter(edge => edge.id !== edgeId));
    },
    [setEdges],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges(prev => applyEdgeChanges(changes, prev));
    },
    [setEdges],
  );

  useEffect(() => {
    console.log('use-edges-atom.ts');
    console.log('edges', edges);
  }, [edges, tables]);

  return {
    edges,
    setEdges,
    connectEdge,
    removeEdge,
    onEdgesChange,
    onDragConnect,
  };
}
