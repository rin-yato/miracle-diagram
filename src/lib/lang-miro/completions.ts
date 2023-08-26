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
  if (
    node.prevSibling?.name === 'TableName' ||
    node.nextSibling?.name === '{' ||
    node.parent?.name === 'Icon'
  ) {
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

export const miroTypeCompletion = completion((context, node) => {
  if (node.type.name !== 'ColumnType') return null;

  // match if there is a word and space
  const match = context.matchBefore(/\w\s+\w+/);

  if (match) {
    return {
      from: node.from,
      options: [
        { label: 'string', type: 'type' },
        { label: 'number', type: 'type' },
        { label: 'boolean', type: 'type' },
        { label: 'int', type: 'type' },
        { label: 'float', type: 'type' },
        { label: 'date', type: 'type' },
      ],
    };
  }

  return null;
});
