import * as vscode from 'vscode';
import * as texty from './types';

export function openUrl(url: string) {
  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(url));
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

export function registerTextCommand(context: vscode.ExtensionContext, id: string, defaultsToFull: boolean = false,
    includeContent: boolean = false, selectionIsMust: boolean, handler: (sel: string) => (undefined | string | Promise<string | undefined>)) {
  context.subscriptions.push(vscode.commands.registerTextEditorCommand(`texty.${id}`, async (editor, edit) => {
    const sels = getSelections(editor, defaultsToFull, includeContent);
    const updates = await Promise.all(sels.map(async sel => {
      if (selectionIsMust) {
        if (sel.content) {
          sel.newContent = await handler(sel.content);
        }
      } else {
        sel.newContent = await handler(sel.content || '');
      }

      return sel;
    }));

    if (!updates) {
      return;
    }

    editor.edit((editBuilder) => {
      for (const update of updates) {
        if (update && update.newContent) {
          editBuilder.replace(update.selection, update.newContent);
        }
      }
    });
  }));
}

export function registerInsertTextCommand(context: vscode.ExtensionContext, id: string,
  handler: (sels: string) => (undefined | string | Promise<string | undefined>)) {
    registerTextCommand(context, id, false, false, false, handler);
}

export function registerProcessTextCommand(context: vscode.ExtensionContext, id: string,
  handler: (sel: string) => (undefined | string | Promise<string | undefined>)) {
    registerTextCommand(context, id, true, true, true, handler);
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