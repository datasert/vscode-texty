import * as vscode from 'vscode';
import * as utils from './utils';
import * as uuid from './modules/uuid';
import * as lorem from './modules/lorem';
import * as picsum from './modules/picsum';
import * as cases from './modules/cases';
import * as crypto from './modules/crypto';
import * as encode from './modules/encode';
import * as lines from './modules/lines';
import * as series from './modules/series';

let context: vscode.ExtensionContext;

const globalCommands: { [key: string]: () => any } = {
  'createIssue': () => utils.openUrl('https://github.com/datasert/vscode-texty/issues/new'),
};

const insertTextCommands: { [key: string]: () => undefined | string | Promise<string | undefined> } = {
  'insertShortId': uuid.generateShortId,
  'insertUuid': uuid.generateUuid,
  'insertUuidKey': uuid.generateUuidKey,
  'insertUuidNoDashes': uuid.generateUuidNoDashes,
  'insertLoremIpsumParagraph': () => lorem.generateLorem({ type: 'paragraph', count: 10 }),
  'insertLoremIpsumSentence': () => lorem.generateLorem({ type: 'sentence', count: 10 }),
  'insertLoremPicsum': async () => picsum.generatePicsum(await picsum.getPicsumOptions(context)),
  'insertLoremPicsumWithOptions': async () => picsum.generatePicsum(await picsum.getPicsumOptions(context, true)),
};

const processTextCommands: { [key: string]: (sels: string) => undefined | string | Promise<string | undefined>} = {
  'convertToLowerCase': cases.convertToLowerCase,
  'convertToUpperCase': cases.convertToUpperCase,
  'convertToCamelCase': cases.convertToCamelCase,
  'convertToPascalCase': cases.convertToPascalCase,
  'convertToSnakeCase': cases.convertToSnakeCase,
  'convertToKebabCase': cases.convertToKebabCase,
  'convertToConstantCase': cases.convertToConstantCase,
  'convertToDotCase': cases.convertToDotCase,
  'convertToPathCase': cases.convertToPathCase,
  'convertToSpaceCase': cases.convertToSpaceCase,
  'convertToCapitalCase': cases.convertToCapitalCase,
  'convertToSentenceCase': cases.convertToSentenceCase,
  'viewMd5Hash': crypto.viewMd5Hash,
  'encryptText': crypto.encryptTextWithPrompt,
  'decryptText': crypto.decryptTextWithPrompt,
  'urlEncode': encode.urlEncode,
  'urlDecode': encode.urlEncode,
  'htmlEncode': encode.htmlEncode,
  'htmlDecode': encode.htmlDecode,
  'xmlEncode': encode.xmlEncode,
  'xmlDecode': encode.xmlDecode,
  'base64Encode': encode.base64Encode,
  'base64Decode': encode.base64Decode,
  'jwtDecode': encode.jwtDecode,
  'sortLines': lines.sortLines,
  'sortLinesReverse': lines.sortLinesReverse,
  'sortLinesNatural': lines.sortLinesNatural,
  'sortLinesNaturalReverse': lines.sortLinesNaturalReverse,
  'sortLinesIgnoreCase': lines.sortLinesIgnoreCase,
  'sortLinesIgnoreCaseReverse': lines.sortLinesIgnoreCaseReverse,
  'sortLinesByLength': lines.sortLinesByLength,
  'sortLinesByLengthReverse': lines.sortLinesByLengthReverse,
  'sortLinesShuffle': lines.sortLinesShuffle,
  'removeDuplicates': lines.removeDuplicates,
  'removeDuplicatesIgnoreCase': lines.removeDuplicatesIgnoreCase,
  'removeBlankLines': lines.removeBlankLines,
  'removeBlankLinesSurplus': lines.removeBlankLinesSurplus,
  'splitByLength120': lines.splitLinesByLength120,
  'splitByLength80': lines.splitLinesByLength80,
  'splitByLength': lines.splitLinesByLengthPrompt,
  'splitBySentences': lines.splitBySentences,
  'translateUsingGoogle': line => utils.openUrl('https://translate.google.com/?q=' + line),
};

const processTextsCommands: { [key: string]: (sels: string[]) => undefined | string[] | Promise<string[] | undefined>} = {
  'insertNumberSeriesFrom0': sels => series.generateFrom0(sels.length),
  'insertNumberSeriesFrom1': sels => series.generateFrom1(sels.length),
  'insertNumberSeriesWithOptions': async sels => series.generate(sels.length, await series.getNumberSeriesOptions(context)),
};

export function activate(extnContext: vscode.ExtensionContext) {
  context = extnContext;

  for (const command of Object.keys(globalCommands)) {
    utils.registerCommand(context, command, globalCommands[command]);
  }

  for (const command of Object.keys(insertTextCommands)) {
    utils.registerInsertTextCommand(context, command, insertTextCommands[command]);
  }

  for (const command of Object.keys(processTextCommands)) {
    utils.registerProcessTextCommand(context, command, processTextCommands[command]);
  }

  for (const command of Object.keys(processTextsCommands)) {
    utils.registerProcessTextsCommand(context, command, processTextsCommands[command]);
  }
}

export function deactivate() { }
