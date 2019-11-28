import * as _ from "lodash";
import * as texty from '../types';

export enum Type {
  CapitalCase,
  LowerCase,
  UpperCase,
  CamelCase,
  PascalCase,
  SnakeCase,
  KebabCase,
  ConstantCase,
  DotCase,
  PathCase,
  SpaceCase,
  SentenceCase,
}

export interface Options {
  type: Type;
}

/**
 * Normalizes given text into spaced words by words boundary. Word boundary is any special char, or capital case.
 */
function normalize(content: string) {
  const parts: string[] = [];
  content.split(/[./\-_ ]/).forEach(split => {
    const values = split.split(/([A-Z][a-z]+)/).map(val => val.trim()).filter(val => val !== '');
    parts.push(...values);
  });

  return parts.join(' ');
}

function convert(content: string, options: Options): string | undefined {
  switch(options.type) {
    case Type.LowerCase: return _.toLower(content);
    case Type.UpperCase: return _.toUpper(content);
    case Type.CapitalCase: return _.capitalize(content);
    case Type.CamelCase: return _.camelCase(content);
    case Type.PascalCase: return _.upperFirst(_.camelCase(content));
    case Type.SnakeCase: return _.snakeCase(content);
    case Type.ConstantCase: return _.toUpper(_.snakeCase(content));
    case Type.KebabCase: return _.kebabCase(content);
    case Type.DotCase: return _.replace(content, / /g, '.');
    case Type.PathCase: return _.replace(content, / /g, '/');
    case Type.SpaceCase: return content;
    case Type.SentenceCase: return _.replace(_.kebabCase(content), /-/g, ' ');
  }
}

export function convertTo(sels: texty.Selection[], options: Options): texty.Selection[] {
  return sels.map(sel => {
    if (sel.content) {
      sel.newContent = sel.content.split('\n').map(line => convert(normalize(line), options)).join('\n');
    }

    return sel;
  });
}
