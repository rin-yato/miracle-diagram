import { z } from 'zod';
import _ from 'lodash';
import { Edge } from 'reactflow';

export const relationshipSchema = z.object({
  source: z.object({
    tableName: z.string().min(1),
    columnName: z.string().min(1),
  }),
  target: z.object({
    tableName: z.string().min(1),
    columnName: z.string().min(1),
  }),
});

export const columnSchema = z.object({
  name: z.string(),
  type: z.string(),
  constraints: z.array(z.string()).optional(),
  relationships: relationshipSchema.optional(),
});

export const tableSchema = z.object({
  name: z.string(),
  icon: z.string().optional(),
  columns: z.array(columnSchema),
});

export type Relationship = z.infer<typeof relationshipSchema>;
export type Column = z.infer<typeof columnSchema>;
export type Table = z.infer<typeof tableSchema>;

/**
 * Extracts all relationships from an array of tables and creates a resulting array.
 * @param tables - Array of tables to extract relationships from.
 * @returns An array of objects containing tableName and associated relationships.
 */
export function extractRelationshipsFromTables(
  tables: Table[],
): Relationship[] {
  const result = [];

  for (const table of tables) {
    for (const column of table.columns) {
      if (column.relationships) {
        result.push(column.relationships);
      }
    }
  }

  return result;
}

export function extractRelationshipsFromEdges(
  edges: Array<Edge<Relationship>>,
): Relationship[] {
  const result = [];

  for (const edge of edges) {
    if (!edge.data) continue;
    result.push(edge.data);
  }

  return result;
}

export function generateRelationshipId(relationship: Relationship): string {
  console.log('relationship', relationship);
  return `${relationship.source.tableName}#${relationship.source.columnName}&${relationship.target.tableName}#${relationship.target.columnName}`;
}

export function getRelationshipFromEdgeId(edgeId: string): Relationship {
  const [source, target] = edgeId.split('&');
  const [sourceTable, sourceColumn] = source.split('#');
  const [targetTable, targetColumn] = target.split('#');

  return {
    source: {
      tableName: sourceTable,
      columnName: sourceColumn,
    },
    target: {
      tableName: targetTable,
      columnName: targetColumn,
    },
  };
}

/**
 * Represents changes in tables.
 */
type TableChanges = {
  addedTables: Table[];
  removedTables: Table[];
  updatedTables: Table[];
};

export function getTablesChanges({
  oldTableArray,
  newTableArray,
}: {
  oldTableArray: Table[];
  newTableArray: Table[];
}): TableChanges {
  const tableMap = new Map<string, Table>();

  // Create a map of old tables for efficient lookup
  for (const table of oldTableArray) {
    tableMap.set(table.name, table);
  }

  const addedTables: Table[] = [];
  const removedTables: Table[] = [];
  const updatedTables: Table[] = [];

  // Compare new tables to old tables
  for (const newTable of newTableArray) {
    const oldTable = tableMap.get(newTable.name);

    if (!oldTable) {
      addedTables.push(newTable);
    } else if (!_.isEqual(oldTable, newTable)) {
      updatedTables.push(newTable);
    }
  }

  // get the deleted tables
  for (const oldTable of oldTableArray) {
    const stillExists = newTableArray.find(
      newTable => newTable.name === oldTable.name,
    );

    if (!stillExists) {
      removedTables.push(oldTable);
    }
  }

  return { addedTables, removedTables, updatedTables };
}

type RelationshipChanges = {
  addedRelationships: Relationship[];
  removedRelationships: Relationship[];
};

export function getRelationshipsChanges({
  oldRelationships,
  newRelationships,
}: {
  oldRelationships: Relationship[];
  newRelationships: Relationship[];
}): RelationshipChanges {
  // get the deleted relationships and added relationships
  const addedRelationships = newRelationships.filter(
    newRelationship =>
      !oldRelationships.find(
        oldRelationship =>
          generateRelationshipId(oldRelationship) ===
          generateRelationshipId(newRelationship),
      ),
  );

  const removedRelationships = oldRelationships.filter(
    oldRelationship =>
      !newRelationships.find(
        newRelationship =>
          generateRelationshipId(oldRelationship) ===
          generateRelationshipId(newRelationship),
      ),
  );

  return { addedRelationships, removedRelationships };
}

export function isValidRelationship({
  relationship,
  tables,
}: {
  relationship: Relationship;
  tables: Table[];
}): Boolean {
  const stringValidation = relationshipSchema.safeParse(relationship);

  if (!stringValidation.success) return false;

  const sourceTable = tables.find(
    table => table.name === relationship.source.tableName,
  );
  const targetTable = tables.find(
    table => table.name === relationship.target.tableName,
  );

  if (!sourceTable || !targetTable) return false;

  const sourceColumn = sourceTable.columns.find(
    column => column.name === relationship.source.columnName,
  );
  const targetColumn = targetTable.columns.find(
    column => column.name === relationship.target.columnName,
  );

  if (!sourceColumn || !targetColumn) return false;

  return true;
}
