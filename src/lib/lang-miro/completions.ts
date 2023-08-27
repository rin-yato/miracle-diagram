import { allIconNames } from '@/components/icons';
import { CompletionContext, CompletionResult } from '@codemirror/autocomplete';
import { syntaxTree } from '@codemirror/language';
import { SyntaxNode } from '@lezer/common';

export const completion = (
  handler: (
    context: CompletionContext,
    node: SyntaxNode,
  ) => CompletionResult | null,
) => {
  return (context: CompletionContext) => {
    const { state, pos } = context;

    const node = syntaxTree(state).resolve(pos, -1);

    return handler(context, node);
  };
};

export const iconCompletion = completion((context, node) => {
  if (node.nextSibling?.name === '{' || node.parent?.name === 'Icon') {
    const options = allIconNames.map(icon => ({
      label: `i-${icon}`,
      type: 'icon',
    }));

    const from = node.name === 'IconName' ? node.from - 2 : node.from;

    return {
      from,
      options,
    };
  }

  return null;
});

const defaultTypes = [
  { label: 'string', type: 'type' },
  { label: 'number', type: 'type' },
  { label: 'boolean', type: 'type' },
  { label: 'int', type: 'type' },
  { label: 'float', type: 'type' },
  { label: 'date', type: 'type' },
];

export const miroTypeCompletion = completion((context, node) => {
  if (!['Column', 'ColumnType'].includes(node.type.name)) return null;

  const filter = node.type.name === 'ColumnType';

  const from = node.type.name === 'ColumnType' ? node.from : context.pos;

  const tree = syntaxTree(context.state).resolveInner(0);

  const tables = tree.getChildren('Table');

  const columns = tables.flatMap(table => table.getChildren('Column'));

  const columnTypes = columns.flatMap(column =>
    column.getChildren('ColumnType'),
  );

  const typeStrings = columnTypes.map(type =>
    context.state.sliceDoc(type.from, type.to),
  );

  // remove duplicates and filter the last one out
  const removedDuplicates = Array.from(new Set(typeStrings)).slice(0, -1);

  const types = removedDuplicates.map(type => ({
    label: type,
    type: 'type',
  }));

  return {
    from,
    filter,
    options: [defaultTypes, types].flat(),
  };
});

export const miroRelationshipCompletion = completion((context, node) => {
  if (node.parent?.name !== 'Relationship' && node.name !== 'Relationship')
    return null;

  const tree = syntaxTree(context.state).resolveInner(0);

  const tables = tree.getChildren('Table').map(tableNode => {
    const tableNameNode = tableNode.getChild('TableName');
    const tableName = context.state.sliceDoc(
      tableNameNode?.from,
      tableNameNode?.to,
    );
    const columns = tableNode
      .getChildren('Column')
      .map(columnNode =>
        context.state.sliceDoc(
          columnNode.firstChild?.from,
          columnNode.firstChild?.to,
        ),
      );

    return {
      name: tableName,
      columns,
    };
  });

  let options: Array<{ label: string; type: string }> = [];
  let from: number;

  if (node.name === 'TableName' || node.name === 'Relationship') {
    from = node.name === 'TableName' ? node.from : context.pos;
    options = tables.map(table => ({
      label: table.name,
      type: 'table',
    }));
  } else if (node.name === 'ColumnName' || node.name === '.') {
    from = node.name === 'ColumnName' ? node.from : context.pos;

    const tableNameNode =
      node.name === 'ColumnName'
        ? node.prevSibling?.prevSibling
        : node.prevSibling;

    const tableName = context.state.sliceDoc(
      tableNameNode?.from,
      tableNameNode?.to,
    );

    const table = tables.find(table => table.name === tableName);

    if (table) {
      options = table.columns.map(column => ({
        label: column,
        type: 'column',
      }));
    }
  } else {
    return null;
  }

  return {
    from,
    options,
  };
});
