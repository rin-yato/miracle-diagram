import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Atom,
  Book,
  BookMarked,
  Code2,
  Combine,
  Contrast,
  CreditCard,
  Dna,
  File,
  FileText,
  Info,
  IterationCw,
  Loader2,
  LogOut,
  LucideProps,
  Mail,
  MessageSquare,
  MessagesSquare,
  MoreHorizontal,
  Pen,
  Settings,
  Trash2,
  User,
  X,
} from 'lucide-react';

export type Icon = keyof typeof Icons;

export const Icons = {
  User,
  CreditCard,
  LogOut,
  Settings,
  Book,
  BookMarked,
  Code2,
  Dna,
  Contrast,
  Combine,
  FileText,
  File,
  Info,
  MessageSquare,
  Atom,
  MessagesSquare,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Loader2,
  Mail,
  Trash2,
  Pen,
  MoreHorizontal,
  IterationCw,
  X,
  Google: (props: LucideProps) => (
    <svg {...props} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  ),
  GitHub: (props: LucideProps) => (
    <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M12.001 2c-5.525 0-10 4.475-10 10a9.994 9.994 0 0 0 6.837 9.488c.5.087.688-.213.688-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.337 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.688c-.1-.25-.45-1.275.1-2.65c0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337c1.913-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.563 4.938c.363.312.676.912.676 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10Z"
      />
    </svg>
  ),
};

export type DynamicIconProps = Omit<
  {
    icon: Icon;
  } & LucideProps,
  'name'
>;

export function DynamicIcon(props: DynamicIconProps) {
  const { icon, ...rest } = props;
  const Icon = Icons[icon];
  return <Icon {...rest} />;
}
