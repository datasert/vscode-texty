import * as uuid from 'uuid';
import * as texty from '../types';

export class UuidOptions {
  prefix = '';
  suffix = '';
}

export function insertUuid(sels: texty.Selection[], options: UuidOptions = new UuidOptions()): texty.Selection[] {
  return sels.map(sel => {
    sel.newContent = options.prefix + uuid() + options.suffix;
    return sel;
  });
}
