import * as texty from '../types';
import * as crypto from 'crypto';
import * as vscode from 'vscode';

var md5 = crypto.createHash('md5');

export function getMd5Hash(sels: texty.Selection[]): texty.Selection[] {
  return sels.map(sel => {
    if (sel.content) {
      sel.newContent = md5.update(sel.content).digest('hex');
    }
    return sel;
  });
}

export function viewMd5Hash(sels: texty.Selection[]): texty.Selection[] | undefined {
  const newSels = getMd5Hash(sels);
  let msg = newSels.map(sel => sel.newContent || '').join('\n');
  vscode.window.showInformationMessage(msg);

  return undefined;
}

export function encryptText(sels: texty.Selection[]): texty.Selection[] | undefined {
  const newSels = getMd5Hash(sels);
  let msg = newSels.map(sel => sel.newContent || '').join('\n');
  vscode.window.showInformationMessage(msg);

  return undefined;
}

export function decryptText(sels: texty.Selection[]): texty.Selection[] | undefined {
  const newSels = getMd5Hash(sels);
  let msg = newSels.map(sel => sel.newContent || '').join('\n');
  vscode.window.showInformationMessage(msg);

  return undefined;
}
