import * as vscode from 'vscode';
import * as texty from './types';

let context: vscode.ExtensionContext;
export function setContext(contextIn: vscode.ExtensionContext) {
  context = contextIn;
}

export const getOs = () => process.platform;
export const isMac = () => process.platform === 'darwin';
export const isWin = () => process.platform === 'win32';
export const isLinux = () => process.platform === 'linux';

export function extractNumbers(value: string) {
  var numb = value.match(/\d/g);
  return numb ? numb.join('') : '';
}

function getSettingString(key: string, defaultVal?: string) {
  return defaultVal ? context.globalState.get<string>(key, defaultVal) :context.globalState.get<string>(key);
}

function getSettingList(key: string, defaultVal: string[]): string[] {
  return context.globalState.get<string[]>(key, defaultVal);
}

function setSetting(key: string, value: string[] | string) {
 context.globalState.update(key, value);
}

function toArray(input: any): any[] {
  if (!input) {
    return [];
  }

  if (!Array.isArray(input)) {
    return [input];
  }

  return input;
}

function dedupe(inArray: any[], keySupplier = (it: any) => it): any[] {
  const seen = new Set();
  const deduped: any[] = [];

  toArray(inArray).forEach((x) => {
    const keyValue = keySupplier(x);
    if (!seen.has(keyValue)) {
      seen.add(keyValue);
      deduped.push(x);
    }
  });

  return deduped;
}

export function showError(message: string) {
  vscode.window.showErrorMessage(message);
}

export function openUrl(url: string): undefined {
  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(url));
  return undefined;
}

export function getAllSelection(editor: vscode.TextEditor): vscode.Selection {
	if (editor.document.lineCount > 0) {
		let lineCount = editor.document.lineCount;
		return new vscode.Selection(0, 0, lineCount, editor.document.lineAt(lineCount-1).text.length);
	}

	return new vscode.Selection(0, 0, 0, 0);
}

export function * getSelectionLines(editor: vscode.TextEditor, selection: vscode.Selection) {
	for (let i = selection.start.line; i <= selection.end.line && i < editor.document.lineCount; i++) {
    const currentLine = editor.document.lineAt(i);

		if (i === selection.start.line && i === selection.end.line) {
			yield currentLine.text.substring(selection.start.character, selection.end.character);

    } else if (i === selection.start.line) {
			yield currentLine.text.substring(selection.start.character);

    } else if (i === selection.end.line) {
			yield currentLine.text.substring(0, selection.end.character);

    } else {
			yield currentLine.text;
		}
	}
}

function getSelectionContent(editor: vscode.TextEditor, selection: vscode.Selection) {
	let selectionContent = '';
	for (const line of getSelectionLines(editor, selection)) {
    if (selectionContent && line) {
      selectionContent += '\n';
    }
		selectionContent += line;
  }

	return selectionContent.trim();
}

function getSelections(editor: vscode.TextEditor, defaultsToFull: boolean = false, includeContent: boolean = false): texty.Selection[] {
	let sels = editor.selections;

  if (defaultsToFull && sels.length === 1 && sels[0].isSingleLine && sels[0].start.character === sels[0].end.character) {
		sels = [];
		sels.push(getAllSelection(editor));
	}

  const newSels = sels.map(sel => {
    const newSel: texty.Selection = {
      selection: sel,
      content: includeContent ? getSelectionContent(editor, sel) : undefined,
    };

    return newSel;
  });

	return newSels;
}

export function registerCommand(context: vscode.ExtensionContext, id: string, handler: () => void) {
  context.subscriptions.push(vscode.commands.registerCommand(`texty.${id}`, handler));
}

export type TextHandler = (sel: string | string[]) => string | string[] | Promise<string | string[] | undefined> | undefined;
type TextCommandOptions = {
  allSelections?: boolean;
  defaultsToFull?: boolean;
  includeContent?: boolean;
  selectionIsMust?: boolean;
  resultsIntoNewEditor?: boolean;
  handler: TextHandler;
}
export function registerTextCommand(context: vscode.ExtensionContext, id: string, options: TextCommandOptions) {
  context.subscriptions.push(vscode.commands.registerTextEditorCommand(`texty.${id}`, async (editor, edit) => {
    const sels = getSelections(editor, options.defaultsToFull, options.includeContent);
    let updates: texty.Selection[] | undefined = [];
    if (!options.allSelections) {
      updates = await Promise.all(sels.map(async sel => {
        if (options.selectionIsMust) {
          if (sel.content) {
            sel.newContent = await options.handler(sel.content) as string;
          }
        } else {
          sel.newContent = await options.handler(sel.content || '') as string;
        }
  
        return sel;
      }));
    } else {
      const values = sels.map(sel => sel.content || '');
      const updatedValues = await options.handler(values) as string[]; 
      if (updatedValues) {
        for (let index = 0; index < sels.length; index++) {
            if (updatedValues.length > index) {
                const sel = sels[index];
                sel.newContent = updatedValues[index];
            }
        }
      }
    updates = sels;
    }

    if (updates) {
      const updateEditor = options.resultsIntoNewEditor ? await createNewEditor() : editor;
      updateEditor.edit((editBuilder) => {
        for (const update of updates || []) {
          if (update && update.newContent) {
            editBuilder.replace(update.selection, update.newContent);
          }
        }
      });
    }
  }));
}

export function registerInsertTextCommand(context: vscode.ExtensionContext, id: string,
  handler: (sels: string) => (undefined | string | Promise<string | undefined>)) {
    registerTextCommand(context, id, {handler: handler as TextHandler});
}

export function registerProcessTextCommand(context: vscode.ExtensionContext, id: string,
  handler: (sel: string) => (undefined | string | Promise<string | undefined>)) {
    registerTextCommand(context, id, {
      includeContent: true, 
      defaultsToFull: true, 
      selectionIsMust: true, 
      handler: handler as TextHandler
    });
}

export function registerProcessTextNewEditorCommand(context: vscode.ExtensionContext, id: string,
  handler: (sel: string) => (undefined | string | Promise<string | undefined>)) {
    registerTextCommand(context, id, {
      includeContent: true, 
      defaultsToFull: true, 
      selectionIsMust: true, 
      resultsIntoNewEditor: true,
      handler: handler as TextHandler
    });
}

export function registerProcessTextsCommand(context: vscode.ExtensionContext, id: string,
  handler: (sel: string[]) => (undefined | string[] | Promise<string[] | undefined>)) {
    registerTextCommand(context, id, {
      allSelections: true,
      includeContent: true,
      defaultsToFull: true,
      selectionIsMust: true,
      handler: handler as TextHandler
    });
}

export function replaceAll(str: string, search: string, replacement: string) {
  return str.split(search).join(replacement);
}

// from https://stackoverflow.com/questions/21647928/javascript-unicode-string-to-hex
export function toHex(content: string){
  var hex, i;

  var result = "";
  for (i=0; i<content.length; i++) {
      hex = content.charCodeAt(i).toString(16);
      result += ("000"+hex).slice(-4);
  }

  return result;
}
export function fromHex (content: string) {
  var j;
  var hexes = content.match(/.{1,4}/g) || [];
  var back = "";
  for(j = 0; j<hexes.length; j++) {
      back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
}

export async function getInputNumber(prompt: string): Promise<number | undefined> {
  const resp = await vscode.window.showInputBox({
    prompt,
    validateInput: val => {
      if (!val) {
        return 'Please enter valid number';
      }

      const value = parseInt(val, 10);
      if (isNaN(value)) {
        return 'Invalid Number [' + val + ']';
      }
      return undefined;
    }
  });

  if (!resp) {
    return undefined;
  }

  return parseInt(resp);
}

export async function getInputString(prompt: string): Promise<string | undefined> {
  const resp = await vscode.window.showInputBox({
    prompt,
  });

  if (!resp) {
    return undefined;
  }

  return resp.trim();
}

export type GetOptionsRequest = {
  settingsKey: string;
  settingsDefault: string;
  showPrompt: boolean;
  message: string;
  placeHolder: string;
  properties: string[];
};

function convertToValue(value: string, type: string) {
  if (!value || !value.trim()) {
    return '';
  }

  if (type === 'int') {
    return parseInt(value);
  }

  if (type === 'float') {
    return parseFloat(value);
  }

  if (type === 'boolean') {
    return value.trim().toLowerCase() === 'true';
  }

  return value.trim().toString();
}

export async function getOptions(context: vscode.ExtensionContext, req: GetOptionsRequest) {
    let value = context.globalState.get<string>(req.settingsKey, req.settingsDefault);
  
    if (req.showPrompt) {
      const resp = await vscode.window.showInputBox({
        value,
        prompt: req.message,
        placeHolder: req.placeHolder,
      });
  
      if (!resp) {
        return undefined;
      }
  
      context.globalState.update(req.settingsKey, resp);
      value = resp;
    }
  
    const options: any = {};
    const props: any = {};

    req.properties.forEach(prop => {
      if (prop.indexOf(':') > 0) {
        const [name, type] = prop.split(':');
        props[name] = type;
      } else {
        props[prop] = 'string';
      }
    });

    value.split(',').forEach(pair => {
      try {
        const parts = pair.split('=');
        const key = parts[0].trim();
        const value = parts[1].trim();
        
        if (props[key]) {
          options[key] = convertToValue(value, props[key]);
        }
      } catch (error) {
        console.error(error);
        // ignore
      }
    });
  
    return options;
}

export async function createNewEditor(content?: string): Promise<vscode.TextEditor> {
		return vscode.window.showTextDocument(await vscode.workspace.openTextDocument({content: content || '', language: '' } as any));
}

export function getEol() {
  return vscode.EndOfLine.CRLF ? '\r\n' : '\n';
}

export function getEditorFile() {
  const uri = vscode.window.activeTextEditor
    && vscode.window.activeTextEditor.document
    && vscode.window.activeTextEditor.document.uri;  

  if (uri) {
    return uri.fsPath;
  }

  return undefined;
}

export type GetQuickPickRequest = {
  settingsKey: string,
  defaultValue?: string;
  placeholder: string;
  items: GetQuickPickItem[];
};

export type GetQuickPickItem = {
  value: string, 
  label?: string,
  description?: string;
};

export async function getQuickPick(prompt: boolean, req: GetQuickPickRequest): Promise<string | undefined> {
  let value = getSettingString(req.settingsKey, req.defaultValue); 
  if (!prompt) {
    return value;
  }

  const historySettingsKey = `${req.settingsKey}.history`;
  let history = getSettingList(historySettingsKey, []);
  const quickPickItems = req.items.map(item => ({
    label: item.label || item.value,
    description: item.description,
    alwaysShow: history.includes(item.value),
    value: item.value,
  }));

  const pickedItem = await vscode.window.showQuickPick(quickPickItems, {
    placeHolder: req.placeholder,
    matchOnDescription: true,
  });

  if (!pickedItem) {
    return undefined;
  }

  history.push(pickedItem.value);
  history = dedupe(history);
  setSetting(historySettingsKey, history);
  setSetting(req.settingsKey, pickedItem.value);

  return pickedItem.value;
}
