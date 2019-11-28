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
		selectionContent += line;
	}
	return selectionContent;
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
  context.subscriptions.push(vscode.commands.registerCommand(id, handler));
}

export function registerInsertTextCommand(context: vscode.ExtensionContext, id: string, handler: (sels: texty.Selection[]) => (undefined | texty.Selection[] | Promise<texty.Selection[] | undefined>)) {
  context.subscriptions.push(vscode.commands.registerTextEditorCommand(id, async (editor, edit) => {
    const updates = await handler(getSelections(editor));
    if (!updates) {
      return;
    }

    editor.edit((editBuilder) => {
      for (const update of updates) {
        if (update.newContent) {
          editBuilder.replace(update.selection, update.newContent);
        }
      }
    });
  }));
}

export function registerReplaceTextCommand(context: vscode.ExtensionContext, id: string, handler: (sels: texty.Selection[]) => (undefined | texty.Selection[] | Promise<texty.Selection[] | undefined>)) {
  context.subscriptions.push(vscode.commands.registerTextEditorCommand(id, async (editor, edit) => {
    const updates = await handler(getSelections(editor, true, true));
    if (!updates) {
      return;
    }

    editor.edit((editBuilder) => {
      for (const update of updates) {
        if (update.newContent) {
          editBuilder.replace(update.selection, update.newContent);
        }
      }
    });
  }));
}
