import * as utils from '../utils';
import * as cases from './cases';
import config from './config.json';

export function generate(count: number, type?: string): string[] | undefined {
  if (!type) {
    return undefined;
  }

  // This is to avoid warning
  // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ "weekdays"
  const localConfig: any = config;
  const preset: string[] = localConfig.presets[type] as string[];
  if (!preset) {
    return undefined;
  }

  const values: string[] = [];
  let presetIndex = 0;
  for (let index = 0; index < count; index++) {
    if (presetIndex >= preset.length) {
      presetIndex = 0;
    }

    values.push(preset[presetIndex]);
    presetIndex++;
  }

  return values;
}

export async function getPresetType(): Promise<string | undefined> {
  const items = Object.keys(config.presets).map(type => ({value: type, label: cases.convertToCapitalCase(cases.convertToSpaceCase(type))}));
  const value = await utils.getQuickPick(true, {
    settingsKey: 'presetSeries.presetType',
    placeHolder: 'Select the Preset Type to generate series',
    items,
  });

  return value;
}
