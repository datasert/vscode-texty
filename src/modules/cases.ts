import toLower from 'lodash.tolower';
import toUpper from 'lodash.toupper';
import camelCase from 'lodash.camelcase';
import capitalize from 'lodash.capitalize';
import kebabCase from 'lodash.kebabcase';
import replace from 'lodash.replace';
import snakeCase from 'lodash.snakecase';
import upperFirst from 'lodash.upperfirst';

/**
 * Normalizes given text into spaced words by words boundary. Word boundary is any special char, or capital case.
 */
function splitWords(content: string) {
  const parts: string[] = [];
  content.split(/[./\-_ ]/).forEach(split => {
    const values = split.split(/([A-Z][a-z]+)/).map(val => val.trim()).filter(val => val !== '');
    parts.push(...values);
  });

  return parts.join(' ');
}

function processWords(content: string, handler: (words: string) => string): string {
  return content.split('\n').map(line => handler(splitWords(line))).join('\n');
}

export function convertToLowerCase(content: string): string {
  return toLower(content);
}

export function convertToUpperCase(content: string): string {
  return toUpper(content);
}

export function convertToCapitalCase(content: string): string {
  return capitalize(content);
}

export function convertToCamelCase(content: string): string {
  return processWords(content, words => camelCase(words));
}

export function convertToPascalCase(content: string): string {
  return processWords(content, words => upperFirst(camelCase(words)));
}

export function convertToSnakeCase(content: string): string {
  return processWords(content, words => snakeCase(words));
}

export function convertToConstantCase(content: string): string {
  return processWords(content, words => toUpper(snakeCase(words)));
}

export function convertToKebabCase(content: string): string {
  return processWords(content, words => kebabCase(words));
}

export function convertToDotCase(content: string): string {
  return processWords(content, words => replace(words, / /g, '.'));
}

export function convertToPathCase(content: string): string {
  return processWords(content, words => replace(words, / /g, '/'));
}

export function convertToSpaceCase(content: string): string {
  return processWords(content, words => words);
}

export function convertToSentenceCase(content: string): string {
  return processWords(content, words => upperFirst(words));
}
