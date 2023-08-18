import { nodesAtom } from '@/jotai/nodes-atom';
import { Table } from '@/types/table';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { Node, NodeChange, applyNodeChanges } from 'reactflow';

export function useNodesAtom() {
  const [nodes, setNodes] = useAtom(nodesAtom);

  const addNode = useCallback(
    (input: Node) => {
      setNodes(prev => [...prev, { ...input, type: 'custom-default' }]);
    },
    [setNodes],
  );

  const removeNode = useCallback(
    (id: string) => {
      setNodes(prev => prev.filter(node => node.id !== id));
    },
    [setNodes],
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes(prev => applyNodeChanges(changes, prev));
    },
    [setNodes],
  );

  const updateNodesFromTables = useCallback(
    (tables: Array<Table>) => {
      const updatedNodes = nodes.map(node => {
        const updatedTable = tables.find(table => table.name === node.id);
        if (updatedTable) {
          return {
            ...node,
            data: updatedTable,
          };
        }
        return node;
      });

      setNodes(updatedNodes);
    },
    [nodes, setNodes],
  );

  return {
    nodes,
    setNodes,
    addNode,
    removeNode,
    onNodesChange,
    updateNodesFromTables,
  };
}
