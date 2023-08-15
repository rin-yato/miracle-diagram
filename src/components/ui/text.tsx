import React from 'react';

import { cn } from '@/lib/utils';

const CONFIG = {
  heading: {
    tag: 'h1',
    tw: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  },
  subheading: {
    tag: 'h2',
    tw: 'scroll-m-20 text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight',
  },
  smallheading: {
    tag: 'h2',
    tw: 'scroll-m-20 text-lg font-semibold tracking-tight',
  },
  title: {
    tag: 'h3',
    tw: 'scroll-m-20 text-base font-semibold tracking-tight',
  },
  caption: {
    tag: 'h4',
    tw: 'scroll-m-20 text-base font-medium tracking-tight',
  },
  body: {
    tag: 'p',
    tw: 'leading-6 text-sm',
  },
  small: {
    tag: 'p',
    tw: 'leading-6 text-xs',
  },
  paragraph: {
    tag: 'p',
    tw: 'leading-7 text-sm [&:not(:first-child)]:mt-6',
  },
} as const;

type TextVariant = keyof typeof CONFIG;

type Tag = (typeof CONFIG)[TextVariant]['tag'];

type Props = {
  variant?: TextVariant;
  children?: React.ReactNode;
} & React.ComponentProps<Tag>;

export default function Text({
  children,
  variant = 'body',
  className,
  ...rest
}: Props) {
  const DynamicText = CONFIG[variant].tag;
  const tw = CONFIG[variant].tw;

  return (
    <DynamicText {...rest} className={cn(tw, className)}>
      {children}
    </DynamicText>
  );
}
