import * as crypto from 'crypto';
import * as vscode from 'vscode';
import * as sjcl from 'sjcl';
import * as utils from '../utils';
import * as lines from '../modules/lines';

var md5 = crypto.createHash('md5');

export function getMd5Hash(sel: string): string {
  return md5.update(sel).digest('hex');
}

export function viewMd5Hash(sel: string): string | undefined {
  vscode.window.showInformationMessage(getMd5Hash(sel));
  return undefined;
}

async function getPassword(prompt: string): Promise<string | undefined> {
  const options = {
    prompt,
    password: true,
  };

  return await vscode.window.showInputBox(options);
}
export async function encryptTextWithPrompt(sel: string): Promise<string | undefined> {
  const resp = await getPassword('Enter Password to encrypt the text. You will need this password to decrypt the text later. '
    + 'If you forget, you will NOT be able to decrypt the text.');
  if (!resp) {
    return undefined;
  }

  return lines.splitLinesByLength80(utils.toHex(JSON.stringify(sjcl.encrypt(resp, sel))));
}

export async function decryptTextWithPrompt(sel: string): Promise<string | undefined> {
  let message = 'Enter Password to decrypt the text. It must be same password the text was encrypted with.';
  while(true) {
    try {
      const resp = await getPassword(message);
      if (!resp) {
        return undefined;
      }
      return sjcl.decrypt(resp, JSON.parse(utils.fromHex(utils.replaceAll(sel, utils.eol, ''))));
    } catch (error) {
      message = 'Invalid Password. Please try again.';
    }
  }
}
