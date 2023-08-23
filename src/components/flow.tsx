'use client';

import 'reactflow/dist/style.css';
import React, { useCallback, MouseEvent, useMemo } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  ConnectionMode,
  Controls,
  Edge,
} from 'reactflow';
import { ButtonEdge } from './edges/button-edge';
import { useNodesAtom } from '@/hooks/use-nodes-atom';
import { useEdgesAtom } from '@/hooks/use-edges-atom';
import { CustomDefaultNode } from './nodes/custom-default';
import { FloatingNode } from './nodes/floating-nodes';

const edgeTypes = {
  'button-edge': ButtonEdge,
};

const nodeTypes = {
  'custom-default': CustomDefaultNode,
  'floating-node': FloatingNode,
};

export function Flow() {
  const { nodes, onNodesChange } = useNodesAtom();
  const { edges, onEdgesChange, connectEdge, setEdges } = useEdgesAtom();

  const onEdgeMouseEnter = useCallback(
    (event: MouseEvent, edge: Edge) => {
      // show the label on mouse enter
      setEdges(es =>
        es.map(e => {
          if (e.id === edge.id) {
            e.label = 'x';
          }
          return e;
        }),
      );
    },
    [setEdges],
  );

  const onEdgeMouseLeave = useCallback(
    (event: MouseEvent, edge: Edge) => {
      // hide the label on mouse leave
      setTimeout(() => {
        setEdges(es =>
          es.map(e => {
            if (e.id === edge.id) {
              e.label = undefined;
            }
            return e;
          }),
        );
      }, 1250);
    },
    [setEdges],
  );

  return (
    <ReactFlow
      fitView
      nodes={nodes}
      edges={edges}
      edgeTypes={edgeTypes}
      nodeTypes={nodeTypes}
      onConnect={connectEdge}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onEdgeMouseEnter={onEdgeMouseEnter}
      onEdgeMouseLeave={onEdgeMouseLeave}
      connectionMode={ConnectionMode.Loose}
    >
      <Controls />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </ReactFlow>
  );
}
