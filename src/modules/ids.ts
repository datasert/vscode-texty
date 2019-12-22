import uuid from 'uuid';
import uniqid from 'uniqid';
import * as utils from '../utils';

export function generateUuid(): string {
  return uuid();
}

export function generateShortId(): string {
  return uniqid();
}

export function generateUuidKey(): string {
  return '{' + uuid() + '}';
}

export function generateUuidNoDashes(): string {
  return utils.replaceAll(uuid(), '-', '');
}
