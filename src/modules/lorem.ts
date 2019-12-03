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
  return generate({type: 'para', count: 1});
}

export function generateLine(): string | undefined {
  return generate({type: 'line', count: 1});
}

export function generateWord(): string | undefined {
  return generate({type: 'word', count: 1});
}

export function generate(options = new Options()): string | undefined {
  if(!options) {
    return undefined;
  }

  if (options.type === 'word') {
    return lorem.generateWords(options.count);
  }

  if (options.type === 'line') {
    return lorem.generateSentences(options.count);
  }

  return lorem.generateParagraphs(options.count);
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

  return options as Options;
}
