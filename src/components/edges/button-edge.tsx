import React, { MouseEvent } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
} from 'reactflow';
import { Button } from '../ui/button';
import { Icons } from '../icons';

const onEdgeClick = (evt: MouseEvent, id: string) => {
  evt.stopPropagation();
  alert(`remove ${id}`);
};

export function ButtonEdge({
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
              onClick={event => onEdgeClick(event, id)}
            >
              <Icons.X className="w-4 h-4" />
            </Button>
          </div>
        </EdgeLabelRenderer>
      )}
    </React.Fragment>
  );
}
