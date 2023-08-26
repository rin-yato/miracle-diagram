import { db } from '@/lib/db';
import { useEffect, useState } from 'react';

export function useAllProjects() {
  const [allProjects, setAllProjects] = useState<string[]>([]);

  useEffect(() => {
    db.projects
      .toCollection()
      .keys()
      .then(key => {
        setAllProjects(key as string[]);
      });
  }, []);

  return { allProjects, setAllProjects };
}
