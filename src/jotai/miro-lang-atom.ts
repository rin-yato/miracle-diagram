import { atom } from 'jotai';
import { projectAtom } from './project-atom';

const initialCode = `
users {
  id int pk,
  name string,
  email string null
}

posts {
  id int pk,
  author_id int fk,
  title string,
  content string
}
`;

export const mirolangAtom = atom(initialCode);
