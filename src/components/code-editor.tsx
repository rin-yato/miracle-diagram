'use client';

import React, { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { materialLight } from '@uiw/codemirror-theme-material';
import { useTheme } from 'next-themes';
import { useTables } from '@/hooks/use-tables';
import { miro } from '@/lib/lang-miro';
import { MiroLang } from '@/lib/lang-miro/parser';
import { useMirolang } from '@/hooks/use-mirolang';

export function CodeEditor() {
  const { resolvedTheme } = useTheme();
  const [code, setCode] = useMirolang();
  const { setTables } = useTables();

  useEffect(() => {
    const parsedTables = new MiroLang(code).parse();
    setTables(parsedTables);
  }, [code, setTables]);

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
      }}
      extensions={[miro()]}
    />
  );
}
