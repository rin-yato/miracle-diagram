import { Relationship } from '@/lib/table';
import { atom } from 'jotai';
import { Edge } from 'reactflow';

export const edgesAtom = atom<Array<Edge<Relationship>>>([]);
