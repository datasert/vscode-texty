import * as vscode from 'vscode';

export interface Selection {
  selection: vscode.Selection;
  content?: string;
  newContent?: string;
}
