import * as vscode from 'vscode';
import * as utils from './utils';
import * as uuid from './modules/uuid';
import * as lorem from './modules/lorem';
import * as picsum from './modules/picsum';
import * as cases from './modules/cases';
import * as crypto from './modules/crypto';
import * as encode from './modules/encode';
import * as texty from './types';

const globalCommands: { [key: string]: () => any } = {
  'createIssue': () => utils.openUrl('https://github.com/datasert/vscode-texty/issues/new'),
};

const insertTextCommands: { [key: string]: (sels: texty.Selection[]) => texty.Selection[] | Promise<texty.Selection[]> } = {
  'insertUuid': uuid.insertUuid,
  'insertUuidKey': sels => uuid.insertUuid(sels, {prefix: '{', suffix: '}' }),
  'insertLoremIpsumParagraph': sels => lorem.insertLoremIpsum(sels, { type: 'paragraph', count: 1 }),
  'insertLoremIpsumSentence': sels => lorem.insertLoremIpsum(sels, { type: 'sentence', count: 1 }),
};

const replaceTextCommands: { [key: string]: (sels: texty.Selection[]) => undefined | texty.Selection[] | Promise<texty.Selection[] | undefined>} = {
  'convertToCapitalCase': sels => cases.convertTo(sels, {type: cases.Type.CapitalCase}),
  'convertToLowerCase': sels => cases.convertTo(sels, {type: cases.Type.LowerCase}),
  'convertToUpperCase': sels => cases.convertTo(sels, {type: cases.Type.UpperCase}),
  'convertToCamelCase': sels => cases.convertTo(sels, {type: cases.Type.CamelCase}),
  'convertToPascalCase': sels => cases.convertTo(sels, {type: cases.Type.PascalCase}),
  'convertToSnakeCase': sels => cases.convertTo(sels, {type: cases.Type.SnakeCase}),
  'convertToKebabCase': sels => cases.convertTo(sels, {type: cases.Type.KebabCase}),
  'convertToConstantCase': sels => cases.convertTo(sels, {type: cases.Type.ConstantCase}),
  'convertToDotCase': sels => cases.convertTo(sels, {type: cases.Type.DotCase}),
  'convertToPathCase': sels => cases.convertTo(sels, {type: cases.Type.PathCase}),
  'convertToSpaceCase': sels => cases.convertTo(sels, {type: cases.Type.SpaceCase}),
  'convertToSentenceCase': sels => cases.convertTo(sels, {type: cases.Type.SentenceCase}),
  'viewMd5Hash': sels => crypto.viewMd5Hash(sels),
  'encryptText': sels => crypto.encryptText(sels),
  'decryptText': sels => crypto.decryptText(sels),
  'urlEncode': sels => encode.urlEncode(sels),
  'urlDecode': sels => encode.urlDecode(sels),
  'htmlEncode': sels => encode.htmlEncode(sels),
  'htmlDecode': sels => encode.htmlDecode(sels),
  'xmlEncode': sels => encode.xmlEncode(sels),
  'xmlDecode': sels => encode.xmlDecode(sels),
  'base64Encode': sels => encode.base64Encode(sels),
  'base64Decode': sels => encode.base64Decode(sels),
  'jwtDecode': sels => encode.jwtDecode(sels),
};

export function activate(context: vscode.ExtensionContext) {
  for (const command of Object.keys(globalCommands)) {
    utils.registerInsertTextCommand(context, `texty.${command}`, globalCommands[command]);
  }

  for (const command of Object.keys(insertTextCommands)) {
    utils.registerInsertTextCommand(context, `texty.${command}`, insertTextCommands[command]);
  }

  for (const command of Object.keys(replaceTextCommands)) {
    utils.registerReplaceTextCommand(context, `texty.${command}`, replaceTextCommands[command]);
  }

  utils.registerInsertTextCommand(context, `texty.insertLoremPicsum`, async sels => picsum.insertPicsum(sels, await picsum.getPicsumOptions(context)));
  utils.registerInsertTextCommand(context, `texty.insertLoremPicsumWithOptions`, async sels => picsum.insertPicsum(sels, await picsum.getPicsumOptions(context, true)));
}

export function deactivate() { }
