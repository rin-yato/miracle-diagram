import { styleTags, tags as t } from '@lezer/highlight';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';

export const MiroStyleTags = styleTags({
  ColumnName: t.propertyName,
  ColumnType: t.string,
  ColumnContraint: t.character,
  TableName: t.name,
  '{ }': t.brace,
});

export const MiroHighlighting = syntaxHighlighting(
  HighlightStyle.define(
    [
      { tag: t.name, color: 'cyan' },
      { tag: t.propertyName, color: 'orange' },
      { tag: t.comment, color: '#4b4949' },

      { tag: t.keyword, color: '#585858' },
      { tag: t.brace, color: 'gray' },
    ],
    { all: { color: 'alicewhite' } },
  ),
);
