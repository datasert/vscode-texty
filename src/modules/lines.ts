import * as utils from "../utils";

function process(content: string, handler: (lines: string[]) => string[]) {
    return handler(content.split('\n')).join('\n');
}

export function sortLines(content: string) {
    return process(content, lines => lines.sort());
}

export function sortLinesReverse(content: string) {
    return process(content, lines => lines.sort().reverse());
}

export function sortLinesIgnoreCase(content: string) {
    return process(content, lines => lines.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())));
}

const intlCollator: Intl.Collator = new Intl.Collator(undefined, {numeric: true});
function naturalCompare(a: string, b: string): number {
  return intlCollator.compare(a, b);
}

export function sortLinesNatural(content: string) {
    return process(content, lines => lines.sort(naturalCompare));
}

export function sortLinesNaturalReverse(content: string) {
    return process(content, lines => lines.sort(naturalCompare).reverse());
}

export function sortLinesIgnoreCaseReverse(content: string) {
    return process(content, lines => lines.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).reverse());
}

export function sortLinesByLength(content: string) {
    return process(content, lines => lines.sort((a, b) => a.length - b.length));
}

export function sortLinesByLengthReverse(content: string) {
    return process(content, lines => lines.sort((a, b) => a.length - b.length).reverse());
}

export function splitBySentences(content: string) {
    return content.split('.').map(line => line.trim()).join('.\n');
}

export function splitLinesByLength(content: string, maxLength: number) {
    return content.split('\n').map(line => (line.match(new RegExp('.{1,' + maxLength + '}', 'g')) || []).join('\n')).join('.\n');
}

export function splitLinesByLength120(content: string) {
    return splitLinesByLength(content, 120);
}

export function splitLinesByLength80(content: string) {
    return splitLinesByLength(content, 80);
}

export async function splitLinesByLengthPrompt(content: string) {
    const length = await utils.getInputNumber('Enter the length to split the lines');
    if (!length) {
        return undefined;
    }

    return splitLinesByLength(content, length);
}

export function sortLinesShuffle(content: string) {
    return process(content, lines => lines.sort((a, b) => Math.random() - Math.random()).reverse());
}

export function removeDuplicates(content: string) {
    return process(content, lines => Array.from(new Set(lines)));
}

export function removeDuplicatesIgnoreCase(content: string) {
    // Solution is from https://stackoverflow.com/questions/46741019/js-new-set-remove-duplicates-case-insensitive
    return process(content, lines => {
        return lines.reduce((result: string[], element) => {
          const normalize = (x: string) => typeof x === 'string' ? x.toLowerCase() : x;
          const normalizedElement = normalize(element);
          if (result.every(otherElement => normalize(otherElement) !== normalizedElement)) {
              result.push(element);
          }
          return result;
        }, []);        
    });
}

export function removeBlankLines(content: string) {
    return process(content, lines => lines.filter(line => line.trim()));
}

export function removeBlankLinesSurplus(content: string) {
    const EOL = content.match(/\r\n/gm)?"\r\n":"\n";
    const regExp = new RegExp("("+EOL+"){3,}", "gm");
    return content.replace(regExp, EOL+EOL);
}

export function filterLinesContainsString(content: string, searchString: string | undefined) {
    if (!searchString) {
        return undefined;
    }

    return process(content, lines => lines.filter(line => line.toLowerCase().indexOf(searchString) >= 0));
}

export function filterLinesNotContainsString(content: string, searchString: string | undefined) {
    if (!searchString) {
        return undefined;
    }

    return process(content, lines => lines.filter(line => line.toLowerCase().indexOf(searchString) < 0));
}

export function filterLinesContainsRegex(content: string, searchRegex: string | undefined) {
    if (!searchRegex) {
        return undefined;
    }

    const regex = new RegExp(searchRegex);
    return process(content, lines => lines.filter(line => regex.test(line)));
}

export function filterLinesNotContainsRegex(content: string, searchRegex: string | undefined) {
    if (!searchRegex) {
        return undefined;
    }

    const regex = new RegExp(searchRegex);
    return process(content, lines => lines.filter(line => !regex.test(line)));
}

export async function getInputSearchString() {
    return utils.getInputString('Enter the Search String');
}

export async function getInputSearchRegex() {
    return utils.getInputString('Enter the Search Regex');
}