'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from '../ui/command';
import { CheckIcon, ChevronsUpDown, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useAtom } from 'jotai';
import { currentProjectAtom } from '@/jotai/project-atom';
import { useAllProjects } from '@/hooks/use-all-projects';
import {
  DialogFooter,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { db } from '@/lib/db';
import useConfirmation from '@/hooks/use-confirmation';
import { toast } from 'react-hot-toast';

export function ProjectSelector() {
  const allProjects = useAllProjects();
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const [open, setOpen] = React.useState(false);
  const [newProjectDialogOpen, setNewProjectDialogOpen] = React.useState(false);
  const [newProjectName, setNewProjectName] = React.useState('');

  const { createConfirmation } = useConfirmation();

  const handleNewProjectSubmit = React.useCallback(() => {
    try {
      db.projects.add({
        id: newProjectName,
        code: '',
        edges: [],
        nodes: [],
        tables: [],
      });

      setCurrentProject(newProjectName);
      setNewProjectDialogOpen(false);
      toast.success(`Project ${newProjectName} has been created.`);
    } catch (error) {
      toast.error('Failed to create project.');
      console.log(error);
    }
  }, [setCurrentProject, newProjectName, setNewProjectDialogOpen]);

  const handleDeleteProject = React.useCallback(async () => {
    if (!allProjects) return;

    if (allProjects?.length < 2) {
      toast.error('You only have one project. 🤨');
      return;
    }

    try {
      await createConfirmation({
        title: `Are you sure you want to delete ${currentProject} project?`,
        description: `This is a permanent action, your project will be deleted forever.`,
        type: 'destructive',
        onConfirm: () => {
          toast.promise(db.projects.delete(currentProject), {
            loading: 'Deleting project...',
            success: () => {
              setCurrentProject(allProjects[0]);
              return `Project ${currentProject} has been deleted.`;
            },
            error: 'Failed to delete project.',
          });
        },
      });
    } catch (error) {
      console.log(error);
    }
  }, [allProjects, createConfirmation, currentProject, setCurrentProject]);

  return (
    <Dialog open={newProjectDialogOpen} onOpenChange={setNewProjectDialogOpen}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-label="Select a project..."
            aria-expanded={open}
            className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
          >
            {currentProject ? currentProject : 'Select a project...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit min-w-[230px] p-0">
          <Command>
            <CommandInput placeholder="Search project..." />
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup heading="Projects">
              {allProjects?.map(temProject => (
                <CommandItem
                  key={temProject}
                  onSelect={() => {
                    setCurrentProject(temProject);
                    setOpen(false);
                  }}
                >
                  {temProject}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      currentProject === temProject
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}

              <CommandSeparator className="my-1" />

              <DialogTrigger asChild>
                <CommandItem
                  onSelect={() => {
                    setNewProjectDialogOpen(true);
                    setOpen(false);
                  }}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Project
                </CommandItem>
              </DialogTrigger>
              <CommandItem onSelect={handleDeleteProject} isDestructive>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete current project
              </CommandItem>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Add a new diagram project to your workspace.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project name</Label>
              <Input
                id="project-name"
                placeholder="miracle diagram"
                onChange={e => setNewProjectName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setNewProjectDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleNewProjectSubmit}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
