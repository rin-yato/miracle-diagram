'use client';

import { CodeEditor } from '@/components/code-editor';
import { Flow } from '@/components/flow';
import { Sash } from '@/components/sash';
import { Metadata } from 'next';
import { useState } from 'react';
import SplitPane from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';

export default function Home() {
  const [sizes, setSizes] = useState<(number | string)[]>(['25%', 'auto']);
  return (
    <main className="w-full h-full flex overflow-hidden">
      <SplitPane
        split="vertical"
        sizes={sizes}
        onChange={setSizes}
        sashRender={Sash}
      >
        <aside className="bg-secondary h-full overflow-y-auto">
          <CodeEditor />
        </aside>
        <section className="flex-1 w-full h-full">
          <Flow />
        </section>
      </SplitPane>
    </main>
  );
}
