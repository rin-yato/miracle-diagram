import { z } from 'zod';

export const relationshipSchema = z.object({
  tableName: z.string(),
  columnName: z.string(),
});

export const columnSchema = z.object({
  name: z.string(),
  type: z.string(),
  constraints: z.array(z.string()).optional(),
  relationships: relationshipSchema.optional(),
});

export const tableSchema = z.object({
  name: z.string(),
  columns: z.array(columnSchema),
});

export type Relationship = z.infer<typeof relationshipSchema>;
export type Column = z.infer<typeof columnSchema>;
export type Table = z.infer<typeof tableSchema>;
