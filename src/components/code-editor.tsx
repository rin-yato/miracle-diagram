'use client';

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { materialLight } from '@uiw/codemirror-theme-material';
import { useTheme } from 'next-themes';
import { miro } from '@/lib/lang-miro';
import { useMirolang } from '@/hooks/use-mirolang';
import { keymap } from '@codemirror/view';
import { insertTab, defaultKeymap, insertNewline } from '@codemirror/commands';
import {
  acceptCompletion,
  completionStatus,
  nextSnippetField,
  startCompletion,
  moveCompletionSelection,
} from '@codemirror/autocomplete';

export function CodeEditor() {
  const { resolvedTheme } = useTheme();
  const [code, setCode] = useMirolang();

  return (
    <CodeMirror
      height="100%"
      width="100%"
      value={code}
      onChange={setCode}
      theme={resolvedTheme === 'dark' ? tokyoNight : materialLight}
      style={{
        fontSize: 22,
        height: '100%',
      }}
      indentWithTab={false}
      basicSetup={{
        tabSize: 2,
        defaultKeymap: false,
        completionKeymap: false,
        drawSelection: false,
        lintKeymap: false,
      }}
      extensions={[
        miro(),
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
                insertNewline(target);
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
      ]}
    />
  );
}
