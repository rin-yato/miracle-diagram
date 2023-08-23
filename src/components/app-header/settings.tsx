'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icons } from '../icons';
import { useImportExport } from '@/hooks/use-import-export';

export function AppHeaderSettings() {
  const { exportToJson, importFromJson } = useImportExport();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Icons.FileJson2 size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-3">
        <DropdownMenuLabel>Import & Export</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={importFromJson}>
          <Icons.FileInput className="mr-2 h-4 w-4" />
          <span>Import Json</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToJson}>
          <Icons.FileOutput className="mr-2 h-4 w-4" />
          <span>Export Json</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
