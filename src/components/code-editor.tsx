'use client';

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { materialLight } from '@uiw/codemirror-theme-material';
import { useTheme } from 'next-themes';
import { miro } from '@/lib/lang-miro';
import { useMirolang } from '@/hooks/use-mirolang';

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
      basicSetup={{
        tabSize: 2,
        defaultKeymap: false,
      }}
      extensions={[miro()]}
    />
  );
}
