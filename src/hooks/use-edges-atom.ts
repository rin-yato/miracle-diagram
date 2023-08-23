import { edgesAtom } from '@/jotai/edges-atom';
import { tablesAtom } from '@/jotai/table-atom';
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

  const connectEdge = useCallback(
    (params: Edge | Connection) => {
      const relationship: Relationship = {
        source: {
          tableName: params.source!,
          columnName: params.sourceHandle?.split('-')[0] || '',
        },
        target: {
          tableName: params.target!,
          columnName: params.targetHandle?.split('-')[0] || '',
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
    console.log('tables', tables);
  }, [edges, tables]);

  return {
    edges,
    setEdges,
    connectEdge,
    removeEdge,
    onEdgesChange,
  };
}
