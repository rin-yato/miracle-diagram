import { edgesAtom } from '@/jotai/edges-atom';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import {
  Connection,
  Edge,
  EdgeChange,
  addEdge,
  applyEdgeChanges,
} from 'reactflow';

export function useEdgesAtom() {
  const [edges, setEdges] = useAtom(edgesAtom);

  const connectEdge = useCallback(
    (params: Edge | Connection) =>
      setEdges(prev => addEdge({ ...params, type: 'button-edge' }, prev)),
    [setEdges],
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

  return { edges, setEdges, connectEdge, removeEdge, onEdgesChange };
}
