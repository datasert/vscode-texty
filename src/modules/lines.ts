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
    return process(content, lines => {
        const newLines: string[] = [];
        let prevBlankLine = false;
        for (const line of lines) {
            if (line.trim() === '') {
                if (!prevBlankLine) {
                    newLines.push(line);
                    prevBlankLine = true;
                }
            } else {
                newLines.push(line);
                prevBlankLine = false;
            }
        }

        return newLines;
    });
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

export function joinLinesForInClause(content: string) {
    return joinLines(content, {start: '\'', between: '\', \'', end: '\''});
}

export function joinLinesWithSpace(content: string) {
    return joinLines(content, {between: ' '});
}

export function joinLinesToCsv(content: string) {
    return joinLines(content, {between: ', '});
}

export type JoinLineOptions = {
    start?: string;
    between?: string;
    end?: string;
};
export function joinLines(content: string, options: JoinLineOptions) {
    if (!options) {
        return undefined;
    }

    return process(content, lines => [(options.start || '') + lines.filter(line => line.trim()).join(options.between || '') + (options.end || '')]);
}

export async function getJoinLinesOptions(prompt: boolean): Promise<JoinLineOptions> {
    const options = await utils.getOptions({
        placeHolder: 'Specify options with comma separated key=value pairs',
        message: 'Enter Join Lines Options. Defaults to [start=, between= , end=]. Where ' 
            + 'start=String to prefix the joined line; '
            + 'between=String to join all lines with; '
            + 'end=String to suffix the joined line; ',
        settingsKey: 'lines.joinLinesOptions',
        settingsDefault: 'start=, between= , end=',
        showPrompt: prompt,
        trimValues: false,
        properties: [
            'start',
            'between',
            'end',
        ],
    });

    return options as JoinLineOptions;
}