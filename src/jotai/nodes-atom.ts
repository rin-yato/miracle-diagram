import { Table } from '@/lib/table';
import { atom } from 'jotai';
import { Node } from 'reactflow';

export const nodesAtom = atom<Array<Node<Table>>>([]);
