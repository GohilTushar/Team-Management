import {v4 as uuidv4} from 'uuid';

export function generateUUID(): string {
  return uuidv4().replace(/-/g, '').substring(0,8);
}

export function generateTaskCode(): string {
  return `TASK-${uuidv4().replace(/-/g, '').substring(0, 4)}`;
}