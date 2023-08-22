import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEqual(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  if (JSON.stringify(arr1) !== JSON.stringify(arr2)) {
    return false;
  }

  return true;
}
