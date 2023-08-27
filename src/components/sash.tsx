export function Sash(index: number) {
  return (
    <div
      key={index + '-sash'}
      className="w-0.5 relative hover:ring-8 before:absolute before:inset-y-0 before:-inset-x-3 before:bg-transparent ring-neutral-200/40 dark:ring-neutral-700/80 duration-300 h-full bg-border"
     />
  );
}
