import {
  LRLanguage,
  LanguageSupport,
  continuedIndent,
  foldInside,
  foldNodeProp,
  indentNodeProp,
  syntaxTree,
} from '@codemirror/language';
import { parser } from './grammar/miro';
import {
  autocompletion,
  completeFromList,
  completeAnyWord,
  CompletionContext,
  CompletionResult,
} from '@codemirror/autocomplete';
import { MiroHighlighting, MiroStyleTags } from './highlight';
import { linter, Diagnostic } from '@codemirror/lint';
import { allIconNames } from '@/components/icons';

let parserWithMetadata = parser.configure({
  props: [
    MiroStyleTags,
    indentNodeProp.add({
      Table: continuedIndent(),
    }),
    foldNodeProp.add({
      Table: cx => {
        const fold = foldInside(cx.node);
        if (!fold) return null;
        return {
          from: fold.from + 2,
          to: fold.to,
        };
      },
    }),
  ],
});

export const miroLanguage = LRLanguage.define({
  name: 'miro',
  parser: parserWithMetadata,
});

export const miroDefaultCompletion = completeFromList([
  { label: 'string', type: 'keyword' },
  { label: 'number', type: 'keyword' },
  { label: 'boolean', type: 'keyword' },
  { label: 'int', type: 'keyword' },
  { label: 'float', type: 'keyword' },
  { label: 'date', type: 'keyword' },
]);

export const iconCompletion = completeFromList(
  allIconNames.map(icon => ({
    label: `i-${icon}`,
    type: 'icon',
  })),
);

const miroTypeCompletion = (
  context: CompletionContext,
): CompletionResult | null => {
  // match if there is a word and space
  const match = context.matchBefore(/\w\s+\w+/);

  if (match) {
    return {
      from: context.pos,
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
};

const MiroLinter = linter(view => {
  let diagnostics: Diagnostic[] = [];
  syntaxTree(view.state)
    .cursor()
    .iterate(node => {
      if (node.type.isError)
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: 'error',
          message: 'Syntax Error!',
          actions: [
            {
              name: 'Remove',
              apply(view, from, to) {
                view.dispatch({ changes: { from, to } });
              },
            },
          ],
        });
    });
  return diagnostics;
});

export function miro() {
  return new LanguageSupport(miroLanguage, [
    MiroHighlighting,
    MiroLinter,
    autocompletion({
      override: [miroTypeCompletion, completeAnyWord, iconCompletion],
    }),
  ]);
}
