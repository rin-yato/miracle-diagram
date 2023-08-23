import { Node, Position, internalsSymbol } from 'reactflow';

type HandleIds = {
  sourceHandleId: string;
  targetHandleId: string;
};

// returns the position (top,right,bottom or right) passed node compared to
function getParams(nodeA: Node, nodeB: Node, handleId: string) {
  const centerA = getNodeCenter(nodeA);
  const centerB = getNodeCenter(nodeB);

  const horizontalDiff = Math.abs(centerA.x - centerB.x);
  const verticalDiff = Math.abs(centerA.y - centerB.y);

  let position: Position;
  let updatedHandleId: string = handleId.split('-')[0];

  if (horizontalDiff > verticalDiff) {
    position = centerA.x > centerB.x ? Position.Left : Position.Right;
    updatedHandleId += centerA.x > centerB.x ? '-left' : '-right';
  } else {
    position = centerA.x > centerB.x ? Position.Left : Position.Right;
    updatedHandleId += centerA.x > centerB.x ? '-left' : '-right';
  }

  const coordinates = getHandleCoordsByPosition(
    nodeA,
    position,
    updatedHandleId,
  );

  if (!coordinates) return [0, 0, position];

  const [x, y] = coordinates;

  return [x, y, position];
}

function getHandleCoordsByPosition(
  node: Node,
  handlePosition: Position,
  handleId: string,
): [number, number] {
  // all handles are from type source, that's why we use handleBounds.source here
  const handle = node[internalsSymbol]?.handleBounds?.source?.find(
    h => h.position === handlePosition && h.id === handleId,
  );

  if (!handle) return [0, 0];

  let offsetX = handle.width / 2;
  let offsetY = handle.height / 2;

  // this is a tiny detail to make the markerEnd of an edge visible.
  // The handle position that gets calculated has the origin top-left, so depending which side we are using, we add a little offset
  // when the handlePosition is Position.Right for example, we need to add an offset as big as the handle itself in order to get the correct position
  switch (handlePosition) {
    case Position.Left:
      offsetX = 0;
      break;
    case Position.Right:
      offsetX = handle.width;
      break;
    case Position.Top:
      offsetY = 0;
      break;
    case Position.Bottom:
      offsetY = handle.height;
      break;
  }

  if (!node?.positionAbsolute) return [0, 0];

  const x = node.positionAbsolute.x + handle.x + offsetX;
  const y = node.positionAbsolute.y + handle.y + offsetY;

  return [x, y];
}

function getNodeCenter(node: Node) {
  if (!node?.positionAbsolute || !node?.width || !node?.height)
    return {
      x: 0,
      y: 0,
    };

  return {
    x: node.positionAbsolute.x + node.width / 2,
    y: node.positionAbsolute.y + node.height / 2,
  };
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(
  source: Node,
  target: Node,
  { sourceHandleId, targetHandleId }: HandleIds,
) {
  const [sx, sy, sourcePos] = getParams(source, target, sourceHandleId);
  const [tx, ty, targetPos] = getParams(target, source, targetHandleId);

  return {
    sx,
    sy,
    tx,
    ty,
    sourcePos,
    targetPos,
  } as {
    sx: number;
    sy: number;
    tx: number;
    ty: number;
    sourcePos: Position;
    targetPos: Position;
  };
}
