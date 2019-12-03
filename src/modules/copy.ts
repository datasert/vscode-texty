import * as clipboardy from 'clipboardy';
import * as utils from '../utils';

export function copyAllOpenedFileNames(): undefined {
  // utils.setClipboard(utils.getAlOpenedEditorFiles().join(utils.eol));
  return undefined;
}

function getTextToCopy(sels: string[]) {
  return sels.join(utils.eol);
}

export function copyText(sels: string[]): undefined {
  clipboardy.writeSync(getTextToCopy(sels));
  return undefined;
}

export function copyTextAppend(sels: string[]): undefined {
  const text = clipboardy.readSync() + utils.eol + getTextToCopy(sels);
  clipboardy.writeSync(text);
  return undefined;
}
