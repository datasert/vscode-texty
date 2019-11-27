// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function registerCommand(context: vscode.ExtensionContext, id: string, handler: () => void) {
  context.subscriptions.push(vscode.commands.registerCommand(id, handler));
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  registerCommand(context, 'texty.createIssue', () => {
    vscode.commands.executeCommand('vscode.open', vscode.Uri.parse('https://github.com/datasert/texty/issues'));
  });
}

// this method is called when your extension is deactivated
export function deactivate() { }
