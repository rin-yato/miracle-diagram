import React, { MouseEvent } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
} from 'reactflow';
import { Button } from '../ui/button';
import { Icons } from '../icons';
import { useEdgesAtom } from '@/hooks/use-edges-atom';

export function ButtonEdgeRaw({
  id,
  sourceX,
  sourceY,
  label,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const { removeEdge } = useEdgesAtom();

  return (
    <React.Fragment>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        interactionWidth={25}
        style={style}
      />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 12,
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
          >
            <Button
              size="icon"
              variant="outline"
              className="w-6 h-6 rounded-full"
              onClick={event => removeEdge(id)}
            >
              <Icons.X className="w-4 h-4" />
            </Button>
          </div>
        </EdgeLabelRenderer>
      )}
    </React.Fragment>
  );
}

export const ButtonEdge = React.memo(ButtonEdgeRaw);