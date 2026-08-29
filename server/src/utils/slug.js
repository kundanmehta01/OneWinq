import crypto from 'crypto';

export const generateSlug = (text) => {
  if (!text) {
    return `user-${crypto.randomBytes(4).toString('hex')}`;
  }

  const baseSlug = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

  return baseSlug || `user-${crypto.randomBytes(4).toString('hex')}`;
};
