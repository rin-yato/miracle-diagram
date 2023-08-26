'use client';

import 'reactflow/dist/style.css';
import React, { useCallback, MouseEvent, useEffect } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  ConnectionMode,
  Controls,
  Edge,
} from 'reactflow';
import { ButtonEdge } from './edges/button-edge';
import { FloatingNode } from './nodes/floating-nodes';
import { useProject } from '@/hooks/use-project';

const edgeTypes = {
  'button-edge': ButtonEdge,
};

const nodeTypes = {
  'floating-node': FloatingNode,
};

export function Flow() {
  const { project, onDragConnect, onEdgesChange, onNodesChange, setProject } =
    useProject();

  const onEdgeMouseEnter = useCallback(
    (event: MouseEvent, edge: Edge) => {
      // show the label on mouse enter
      setProject('edges', es =>
        es.map(e => {
          if (e.id === edge.id) {
            e.label = 'x';
          }
          return e;
        }),
      );
    },
    [setProject],
  );

  const onEdgeMouseLeave = useCallback(
    (event: MouseEvent, edge: Edge) => {
      // hide the label on mouse leave
      setTimeout(() => {
        setProject('edges', es =>
          es.map(e => {
            if (e.id === edge.id) {
              e.label = undefined;
            }
            return e;
          }),
        );
      }, 1250);
    },
    [setProject],
  );

  useEffect(() => {
    console.log('project', project);
  }, [project]);

  return (
    <ReactFlow
      fitView
      nodes={project?.nodes}
      edges={project?.edges}
      edgeTypes={edgeTypes}
      nodeTypes={nodeTypes}
      onConnect={onDragConnect}
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
