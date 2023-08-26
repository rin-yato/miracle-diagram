import { atom } from 'jotai';
import { Edge, Node } from 'reactflow';
import { atomWithStorage } from 'jotai/utils';
import { Table } from '@/lib/table';

export type Project = {
  id: string;
  code: string;
  nodes: Array<Node>;
  edges: Array<Edge>;
  tables: Array<Table>;
};

export const projectAtom = atom<Project | undefined>(undefined);

export const currentProjectAtom = atomWithStorage('currentProject', 'example');
