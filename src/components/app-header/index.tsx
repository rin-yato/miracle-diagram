import React from 'react';
import { Icons } from '../icons';
import Text from '../ui/text';
import { ThemeToggle } from '../theme/toggle';
import { ImportExport } from './import-export';
import { ProjectSelector } from './project-selector';
import { DocsSheet } from '../docs-sheet';
import { Button } from '../ui/button';
import Link from 'next/link';

export function AppHeader() {
  return (
    <div className="px-5 py-4 border-b-2 flex justify-between">
      <div className="flex items-center gap-3">
        <div
          id="miracle-diagram-logo"
          className="p-1 group aspect-square hover:ring-4 duration-300 rounded-lg bg-gradient-to-br ring from-blue-400 to-blue-700"
        >
          <Icons.Diamond
            className="text-white fill-white group-hover:rotate-180 group-hover:active:rotate-0 group-hover:scale-75 duration-500"
            size="24"
          />
        </div>
        <Text variant="title" className="font-bold text-lg">
          Miracle Diagram
        </Text>
      </div>
      <div className="flex gap-3">
        <ProjectSelector />
        <ImportExport />
        <ThemeToggle />
        <DocsSheet />
        <Button asChild variant="outline" size="icon">
          <Link
            href="https://github.com/rin-yato/miracle-diagram"
            target="_blank"
          >
            <Icons.GitHub size={22} />
          </Link>
        </Button>
      </div>
    </div>
  );
}
