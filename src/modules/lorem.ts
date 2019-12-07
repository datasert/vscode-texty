import { LoremIpsum } from "lorem-ipsum";
import * as utils from "../utils";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

export class Options {
  type: string = 'para';
  count: number = 1;
}

export function generatePara(): string | undefined {
  return (generate(1, {type: 'para', count: 1}) as string[])[0];
}

export function generateLine(): string | undefined {
  return (generate(1, {type: 'line', count: 1}) as string[])[0];
}

export function generateWord(): string | undefined {
  return (generate(1, {type: 'word', count: 1}) as string[])[0];
}

export function generate(selsCount: number, options = new Options()): string[] | undefined {
  if(!options) {
    return undefined;
  }

  const values: string[] = [];

  for (let index = 0; index < selsCount; index++) {
    if (options.type === 'word' || options.type === 'words') {
      values.push(lorem.generateWords(options.count));

    } else if (options.type === 'line' || options.type === 'lines') {
      values.push(lorem.generateSentences(options.count));

    } else {
      values.push(lorem.generateParagraphs(options.count));
    }
  }

  return values;
}

export async function getOptions(): Promise<Options> {
  const options = await utils.getOptions({
      placeHolder: 'Specify options with comma separated key=value pairs',
      message: 'Enter Lorem Ipsum Options. Defaults to [type=para, count=1]. Where '
          + 'type=Generation type. Valid values are word, line and para (means paragraph); '
          + 'count=Number of values of specified type to generate; ',
      settingsKey: 'lorem.loremIpsumOptions',
      settingsDefault: 'type=para, count=1',
      showPrompt: true,
      properties: [
          'type',
          'count:int',
      ],
      trimValues: true,
  });

    console.log('Returning options ' + JSON.stringify(options));

  return options as Options;
}
