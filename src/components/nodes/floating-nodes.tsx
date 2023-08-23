import { tableSchema } from '@/lib/table';
import React, { memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { Separator } from '../ui/separator';

export const FloatingNode = memo((props: NodeProps) => {
  const table = tableSchema.safeParse(props.data);

  if (!table.success) return null;

  return (
    <React.Fragment>
      <div className="bg-secondary py-2 flex flex-col border rounded-lg">
        <h3 className="font-semibold px-4">{table.data.name}</h3>
        <Separator className="my-2" />
        <ul>
          {table.data.columns.map(column => (
            <li
              key={column.name}
              className="flex justify-between gap-12 px-4 py-0.5 relative hover:bg-neutral-200 dark:hover:bg-neutral-700"
            >
              <Handle
                type="source"
                id={column.name}
                position={Position.Right}
                className="top-1/2 -translate-y-1/2"

              />
              <Handle
                type="source"
                id={column.name}
                position={Position.Left}
                className="top-1/2 -translate-y-1/2"
              />
              <span className="font-medium">{column.name}</span> {column.type}
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
});

FloatingNode.displayName = 'FloatingNode';
