import uuid from 'uuid';
import * as utils from '../utils';

export function generateUuid(): string {
  return uuid();
}

export function generateUuidKey(): string {
  return '{' + uuid() + '}';
}

export function generateUuidNoDashes(): string {
  return utils.replaceAll(uuid(), '-', '');
}
