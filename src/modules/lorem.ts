import { LoremIpsum } from "lorem-ipsum";
import * as texty from '../types';

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
  type: string = 'paragraph';
  count: number = 1;
}

function generate(type: string, count: number) {
  if (type === 'word') {
    return lorem.generateWords(count);
  }

  if (type === 'sentence') {
    return lorem.generateSentences(count);
  }

  return lorem.generateParagraphs(count);
}

export function insertLoremIpsum(sels: texty.Selection[], options = new Options()): texty.Selection[] {
  return sels.map(sel => {
    sel.newContent = generate(options.type, options.count);
    return sel;
  });
}
