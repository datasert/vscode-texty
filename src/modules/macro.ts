import * as vscode from 'vscode';
import * as utils from '../utils';

export type CommandParam = {
  name: string;
  type?: string;
  value: string;
};

export type Command = {
  id: string;
  params?: CommandParam[],
};

export async function execute(commands: Command[]): Promise<undefined> {
  for (const command of commands) {
    try {
      await vscode.commands.executeCommand(command.id, ...(command.params || []));
    } catch (error) {
      utils.showError(`Error executing command ${command.id}. ${error.message}`);
    }
  }

  return undefined;
}
