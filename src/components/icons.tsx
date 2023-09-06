import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Atom,
  Book,
  Hexagon,
  Diamond,
  BookMarked,
  ArrowUpRight,
  Code2,
  EggFried,
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
  FileJson2,
  FileInput,
  FileOutput,
  X,
  Image,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import dynamicIconImport from 'lucide-react/dynamicIconImports';
import React from 'react';

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
  EggFried,
  File,
  Hexagon,
  Info,
  ArrowUpRight,
  MessageSquare,
  Atom,
  MessagesSquare,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Diamond,
  Loader2,
  Mail,
  Trash2,
  Pen,
  FileJson2,
  FileInput,
  FileOutput,
  MoreHorizontal,
  IterationCw,
  X,
  Image,
  Stars: (props: LucideProps) => (
    <svg
      width="26"
      height="26"
      {...props}
      viewBox="0 0 26 26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        <path
          d="M26 14c0 6.627-5.373 12-12 12S2 20.627 2 14S7.373 2 14 2s12 5.373 12 12Z"
          opacity=".2"
        />
        <path
          fill-rule="evenodd"
          d="M12 3.5a.5.5 0 0 1 .479.354l1.928 6.333l5.765 2.107a.5.5 0 0 1 .013.934l-5.727 2.275l-1.979 6.64a.5.5 0 0 1-.958 0l-1.979-6.64l-5.727-2.275a.5.5 0 0 1 .013-.934l5.765-2.107l1.929-6.333A.5.5 0 0 1 12 3.5Zm0 2.216l-1.523 5a.5.5 0 0 1-.307.325l-4.767 1.742l4.734 1.88a.5.5 0 0 1 .294.322l1.57 5.264l1.568-5.264a.5.5 0 0 1 .294-.322l4.734-1.88l-4.767-1.742a.5.5 0 0 1-.307-.324L12 5.716Z"
          clip-rule="evenodd"
        />
        <path d="M19.75 22.12c-.1 0-.19-.08-.2-.18c-.18-1.82-.32-2.4-1.99-2.56c-.1-.01-.18-.1-.18-.2s.08-.19.18-.2c1.71-.16 1.81-.6 1.99-2.42c0-.1.1-.18.2-.18s.19.08.2.18c.18 1.82.29 2.26 1.99 2.42c.1.01.18.1.18.2s-.08.19-.18.2c-1.68.16-1.81.74-1.99 2.57c0 .1-.09.18-.2.18v-.01Z" />
        <path
          fill-rule="evenodd"
          d="M13 24.5c6.351 0 11.5-5.149 11.5-11.5S19.351 1.5 13 1.5S1.5 6.649 1.5 13S6.649 24.5 13 24.5Zm0 1c6.904 0 12.5-5.596 12.5-12.5S19.904.5 13 .5S.5 6.096.5 13S6.096 25.5 13 25.5Z"
          clip-rule="evenodd"
        />
      </g>
    </svg>
  ),
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
    <svg
      {...props}
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
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

interface LooseIconProps extends LucideProps {
  icon: keyof typeof dynamicIconImport | undefined | null;
}

export const allIconNames = Object.keys(dynamicIconImport);

export function isValidIconName(
  icon: string | null | undefined,
): icon is keyof typeof dynamicIconImport {
  if (!icon) return false;
  return allIconNames.includes(icon);
}

function LooseIconRaw({ icon, ...props }: LooseIconProps) {
  if (!icon) return null;

  const LucideIcon = dynamic(dynamicIconImport[icon]);

  return <LucideIcon {...props} />;
}

export const LooseIcon = React.memo(LooseIconRaw);
