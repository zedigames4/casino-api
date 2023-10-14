import fs from 'fs';
import Keys from '../keys';

export const isRoleAllowed = (role: string) =>
  ['admin', 'manager'].includes(role);

export const imageUrl = (filename: string) => {
  const filePath = `uploads/${filename}`;
  if (!filename || !fs.existsSync(filePath)) {
    return null;
  }
  return `${Keys.HOST}/${filePath}`;
};
