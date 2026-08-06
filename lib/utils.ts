import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { customAlphabet } from 'nanoid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const nanoid = customAlphabet('0123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz', 8);
export function generateReferralCode(): string { return nanoid(); }

export function getAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? 'https://glimms.ai';
}

export function getReferralUrl(code: string): string {
  return `${getAppUrl()}/r/${code}`;
}
