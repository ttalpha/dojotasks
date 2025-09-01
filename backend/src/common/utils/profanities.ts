import { profanityList } from './profanity-list';

export function detectProfanity(text: string) {
  const regex = new RegExp(`\\b(${profanityList.join('|')})\\b`, 'i');
  return regex.test(text);
}

// Replace profanity, preserving length with asterisks
export function replaceProfanity(text: string) {
  const regex = new RegExp(`\\b(${profanityList.join('|')})\\b`, 'gi');
  return text.replace(regex, (match) => '*'.repeat(match.length));
}
