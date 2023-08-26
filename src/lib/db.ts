import { Project } from '@/jotai/project-atom';
import Dexie, { Table } from 'dexie';

export class MiracleDiagramDB extends Dexie {
  projects!: Table<Project>;

  constructor() {
    super('MiracleDiagramDB');
    this.version(1).stores({
      projects: 'id, code, nodes, edges, tables',
    });
  }
}

export const db = new MiracleDiagramDB();
