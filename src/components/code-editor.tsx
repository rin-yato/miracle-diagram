'use client';

import React, { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { materialLight } from '@uiw/codemirror-theme-material';
import { useTheme } from 'next-themes';
import { parseInput } from '@/lib/parser';
import { useDebouncedState } from '@mantine/hooks';
import { useTables } from '@/hooks/use-tables';

const initialCode = `
users {
  id int pk
  name string
  email string
}
`;

export function CodeEditor() {
  const { resolvedTheme } = useTheme();
  const [code, setCode] = useDebouncedState(initialCode, 275);
  const { setTables } = useTables();

  useEffect(() => {
    const result = parseInput(code);
    setTables(result);
    console.log('result', result);
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
      }}
    />
  );
}
