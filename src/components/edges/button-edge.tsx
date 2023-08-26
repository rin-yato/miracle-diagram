import React, { useCallback } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useStore,
} from 'reactflow';
import { Button } from '../ui/button';
import { Icons } from '../icons';
import { getEdgeParams } from '@/lib/floating';
import { useProject } from '@/hooks/use-project';

export function ButtonEdgeRaw({
  id,
  label,
  style = {},
  source,
  target,
  sourceHandleId,
  targetHandleId,
  markerEnd,
}: EdgeProps) {
  const sourceNode = useStore(
    useCallback(store => store.nodeInternals.get(source), [source]),
  );

  const targetNode = useStore(
    useCallback(store => store.nodeInternals.get(target), [target]),
  );

  const { removeEdge } = useProject();

  const handleRemoveEdge = useCallback(() => {
    removeEdge(id);
  }, [id, removeEdge]);

  if (!sourceNode || !targetNode) return null;

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode,
    {
      sourceHandleId: sourceHandleId ?? '',
      targetHandleId: targetHandleId ?? '',
    },
  );

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetX: tx,
    targetY: ty,
    targetPosition: targetPos,
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
              onClick={handleRemoveEdge}
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
