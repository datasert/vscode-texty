import * as vm from 'vm';
import moment from 'moment-timezone';
import * as lodash from 'lodash';
import numeral from 'numeral';
import * as utils from '../utils';
import * as cases from './cases';
import * as copy from './copy';
import * as crypto from './crypto';
import * as dates from './dates';
import * as encode from './encode';
import * as lines from './lines';
import * as lorem from './lorem';
import * as numbers from './numbers';
import * as open from './open';
import * as picsum from './picsum';
import * as presets from './presets';
import * as ids from './ids';

let customCommands: any;
export function setCustomCommands(commands: any) {
  customCommands = commands;
}

export async function processSelectionsUsingCustomCommand(sels: string[]) {
  if (Object.keys(customCommands).length === 0) {
    utils.showError('There are no custom commands defined in the settings. Add one or more commands and try again.');
    return undefined;
  }

  const req: utils.GetQuickPickRequest = {
    settingsKey: '',
    placeHolder: 'Select custom command to process selections',
    items: Object.keys(customCommands).map(command => ({
      value: customCommands[command].script,
      label: customCommands[command].title,
    })),
  };

  const value = await utils.getQuickPick(true, req);
  return processSelectionsUsingScript(sels, value);
}

function createContext(sels: string[], sel: string, lines?: string[], line?: string) {
  const context = {
    selections: sels,
    selection: sel,
    lodash,
    _: lodash,
    moment,
    numeral,
    texty: {
      cases,
      copy,
      crypto,
      dates,
      encode,
      lines,
      lorem,
      numbers,
      open,
      picsum,
      presets,
      ids,
    }
  };

  vm.createContext(context);

  return context;
}

function execute(expr: string, context: object) {
  try {
    return vm.runInContext(expr, context, {
      displayErrors: true,
      timeout: 5000
    });
  } catch (error) {
    utils.showError(`Error executing script [${expr}]. ${error.message}`);
    return undefined;
  }
}

export function processSelectionsUsingScript(sels: string[], expr?: string) {
  if (!expr) {
    return undefined;
  }

  return sels.map(sel => {
    const val = execute(expr, createContext(sels, sel));
    return val ? val.toString() : '';
  });
}

export function processLinesUsingScript(sels: string[], expr?: string) {
  if (!expr) {
    return undefined;
  }

  return sels.map(sel => {
    return utils.processLines(sel, lines => {
      return lines.map(line => {
        const val = execute(expr, createContext(sels, sel, lines, line));
        return val ? val.toString() : '';
      });
    });
  });
}

export function getSelectionEvalScript(): Promise<string | undefined> {
  return utils.getInput({
    settingsKey: 'evals.selectionsCustomScript',
    placeHolder: 'javascript expression',
    prompt: 'Enter script process selections with. You can use variables [selections, selection, lodash, moment and numeral] to build your expressions.',
  });
}

export function getLineEvalScript(): Promise<string | undefined> {
  return utils.getInput({
    settingsKey: 'evals.linesCustomScript',
    placeHolder: 'javascript expression',
    prompt: 'Enter script process lines with. You can use variables [selections, selection, lodash, moment and numeral] to build your expressions.',
  });
}
