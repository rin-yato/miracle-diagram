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
import { SyntaxNode } from '@lezer/common';
import { iconCompletion, miroTypeCompletion } from './completions';

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

export const MiroLinter = linter(view => {
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
        });
    });
  return diagnostics;
});

export function miro() {
  return new LanguageSupport(miroLanguage, [
    MiroHighlighting,
    MiroLinter,
    autocompletion({
      override: [miroTypeCompletion, iconCompletion],
    }),
  ]);
}
