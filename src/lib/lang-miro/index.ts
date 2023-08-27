import {
  LRLanguage,
  LanguageSupport,
  continuedIndent,
  foldInside,
  foldNodeProp,
  indentNodeProp,
  indentUnit,
  syntaxTree,
} from '@codemirror/language';
import { parser } from './grammar/miro';
import {
  acceptCompletion,
  autocompletion,
  completionStatus,
  moveCompletionSelection,
  startCompletion,
} from '@codemirror/autocomplete';
import { MiroHighlighting, MiroStyleTags } from './highlight';
import { linter, Diagnostic } from '@codemirror/lint';
import {
  iconCompletion,
  miroRelationshipCompletion,
  miroTypeCompletion,
} from './completions';
import { keymap } from '@codemirror/view';
import {
  defaultKeymap,
  insertNewlineAndIndent,
  insertTab,
} from '@codemirror/commands';

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
      override: [
        miroTypeCompletion,
        iconCompletion,
        miroRelationshipCompletion,
      ],
    }),
    keymap.of([
      {
        key: 'Tab',
        preventDefault: true,
        run: target => {
          if (completionStatus(target.state) === 'active') {
            moveCompletionSelection(true)(target);
          } else {
            insertTab(target);
          }
          return true;
        },
      },
      {
        key: 'Enter',
        preventDefault: true,
        run: target => {
          if (completionStatus(target.state) === 'active') {
            acceptCompletion(target);
          } else {
            insertNewlineAndIndent(target);
          }
          return true;
        },
      },
      {
        key: 'Ctrl-Space',
        mac: 'Cmd-i',
        preventDefault: true,
        run: startCompletion,
      },
      ...defaultKeymap,
    ]),
  ]);
}
