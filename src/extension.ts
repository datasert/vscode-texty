import * as vscode from 'vscode';
import * as utils from './utils';
import * as uuid from './modules/ids';
import * as lorem from './modules/lorem';
import * as picsum from './modules/picsum';
import * as cases from './modules/cases';
import * as crypto from './modules/crypto';
import * as encode from './modules/encode';
import * as lines from './modules/lines';
import * as numbers from './modules/numbers';
import * as dates from './modules/dates';
import * as open from './modules/open';
import * as copy from './modules/copy';
import * as presets from './modules/presets';
import * as evals from './modules/evals';

let context: vscode.ExtensionContext;

const globalCommands: { [key: string]: () => any } = {
  'createIssue': () => utils.openUrl('https://github.com/datasert/vscode-texty/issues/new'),
  'enableTexty': () => utils.showInfo('Texty is enabled!'),
};

const insertTextCommands: { [key: string]: () => undefined | string | Promise<string | undefined> } = {
  'insertDateTimeIsoString': dates.getDateTimeIsoString,
  'insertDateIsoString': dates.getDateIsoString,
  'insertShortId': uuid.generateShortId,
  'insertUuid': uuid.generateUuid,
  'insertUuidKey': uuid.generateUuidKey,
  'insertUuidNoDashes': uuid.generateUuidNoDashes,
  'insertLoremIpsumParagraph': lorem.generatePara,
  'insertLoremIpsumLine': lorem.generateLine,
  'insertLoremIpsumWord': lorem.generateWord,
  'openFileInSystemDefaultApp': () => open.openFileInSystemDefaultApp(utils.getActiveEditorFile()),
  'openFileInBrowser': async () => open.openFileInBrowser(utils.getActiveEditorFile(), await open.getPreferredBrowser(false)),
  'openFileInBrowserPrompt': async () => open.openFileInBrowser(utils.getActiveEditorFile(), await open.getPreferredBrowser(true)),
};

const insertTextsCommands: { [key: string]: (count: number) => undefined | string[] | Promise<string[] | undefined> } = {
  'insertLoremIpsumWithOptions': async count => lorem.generate(count, await lorem.getOptions()),
  'insertLoremPicsum': count => picsum.generate(count, new picsum.Options()),
  'insertLoremPicsumWithOptions': async count => picsum.generate(count, await picsum.getPicsumOptions(context, true)),
  'insertPresetSeries': async count => presets.generate(count, await presets.getPresetType()),
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
  'convertToRelativeTime': dates.convertToRelativeTime,
  'convertDateTimeToFriendly': dates.convertToFriendly,
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
  'joinLinesForInClause': lines.joinLinesForInClause,
  'joinLinesToCsv': lines.joinLinesForInClause,
  'joinLinesWithSpace': lines.joinLinesWithSpace,
};

const processTextsNewEditorCommands: { [key: string]: (sels: string[]) => undefined | string[] | Promise<string[] | undefined>} = {
  'filterLinesContainsStringNewEditor': async sels => lines.filterLinesContainsString(sels, await lines.getInputSearchString()),
  'filterLinesNotContainsStringNewEditor': async sels => lines.filterLinesNotContainsString(sels, await lines.getInputSearchString()),
  'filterLinesContainsRegexNewEditor': async sels => lines.filterLinesContainsRegex(sels, await lines.getInputSearchRegex()),
  'filterLinesNotContainsRegexNewEditor': async sels => lines.filterLinesNotContainsRegex(sels, await lines.getInputSearchRegex()),
};

const processTextsCommands: { [key: string]: (sels: string[]) => undefined | string[] | Promise<string[] | undefined>} = {
  'insertNumberSeriesFrom0': sels => numbers.generateFrom0(sels.length),
  'insertNumberSeriesFrom1': sels => numbers.generateFrom1(sels.length),
  'insertNumberSeriesWithOptions': async sels => numbers.generate(sels.length, await numbers.getOptions()),
  'insertDateSeriesWithOptions': async sels => numbers.generate(sels.length, await numbers.getOptions()),
  'convertDateTime': async sels => dates.convertDateTime(sels, await dates.getConvertTimeOptions()),
  'joinLinesWithOptions': async sels => lines.joinLines(sels, await lines.getJoinLinesOptions(true)),
  'filterLinesContainsString': async sels => lines.filterLinesContainsString(sels, await lines.getInputSearchString()),
  'filterLinesNotContainsString': async sels => lines.filterLinesNotContainsString(sels, await lines.getInputSearchString()),
  'filterLinesContainsRegex': async sels => lines.filterLinesContainsRegex(sels, await lines.getInputSearchRegex()),
  'filterLinesNotContainsRegex': async sels => lines.filterLinesNotContainsRegex(sels, await lines.getInputSearchRegex()),
  'copyLinesContainsString': async sels => lines.copyLinesContainsString(sels, await lines.getInputSearchString()),
  'copyLinesNotContainsString': async sels => lines.copyLinesNotContainsString(sels, await lines.getInputSearchString()),
  'copyLinesContainsRegex': async sels => lines.copyLinesContainsRegex(sels, await lines.getInputSearchRegex()),
  'copyLinesNotContainsRegex': async sels => lines.copyLinesNotContainsRegex(sels, await lines.getInputSearchRegex()),
  'processSelectionsUsingScript': async sels => evals.processSelectionsUsingScript(sels, await evals.getSelectionEvalScript()),
  'processLinesUsingScript': async sels => evals.processLinesUsingScript(sels, await evals.getLineEvalScript()),
  'copyText': copy.copyText,
  'copyTextAppend': copy.copyTextAppend,
};

function registerCustomCommands() {
  const texty = vscode.workspace.getConfiguration('texty');
  if (!texty || !texty.customCommands) {
    return;
  }

  evals.setCustomCommands(texty.customCommands);
  utils.registerProcessTextsCommand(`processSelectionsUsingCustomCommand`, sels => evals.processSelectionsUsingCustomCommand(sels));

  Object.keys(texty.customCommands).forEach(command => {
    utils.registerProcessTextsCommand(`custom.${command}`, sels => evals.processSelectionsUsingScript(sels, texty.customCommands[command].script));
  });
}

export function activate(extnContext: vscode.ExtensionContext) {
  context = extnContext;
  utils.setContext(context);

  Object.keys(globalCommands).forEach(command => utils.registerCommand(command, globalCommands[command]));
  Object.keys(insertTextCommands).forEach(command => utils.registerInsertTextCommand(command, insertTextCommands[command]));
  Object.keys(insertTextsCommands).forEach(command => utils.registerInsertTextsCommand(command, insertTextsCommands[command]));
  Object.keys(processTextCommands).forEach(command => utils.registerProcessTextCommand(command, processTextCommands[command]));
  Object.keys(processTextsNewEditorCommands).forEach(command => utils.registerProcessTextsNewEditorCommand(command, processTextsNewEditorCommands[command]));
  Object.keys(processTextsCommands).forEach(command => utils.registerProcessTextsCommand(command, processTextsCommands[command]));
  registerCustomCommands();
}

export function deactivate() { }
