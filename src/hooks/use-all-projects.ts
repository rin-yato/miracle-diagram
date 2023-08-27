import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';

export function useAllProjects() {
  const allProjects = useLiveQuery(() => db.projects.toCollection().keys(), []);

  return allProjects as (string[] | undefined);
}
