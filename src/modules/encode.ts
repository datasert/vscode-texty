import * as entities from "entities";
import * as jwtDecoder from "jwt-decode";
import * as texty from '../types';

function process(sels: texty.Selection[], handler: (value: string) => string): texty.Selection[] {
  return sels.map(sel => {
    if (sel.content) {
      sel.newContent = handler(sel.content);
    }

    return sel;
  });
}

export function urlEncode(sels: texty.Selection[]): texty.Selection[] {
  return process(sels, value => encodeURIComponent(value));
}

export function urlDecode(sels: texty.Selection[]): texty.Selection[] {
  return process(sels, value => decodeURIComponent(value));
}

export function htmlEncode(sels: texty.Selection[]): texty.Selection[] {
  return process(sels, value => entities.encodeHTML5(value));
}

export function htmlDecode(sels: texty.Selection[]): texty.Selection[] {
  return process(sels, value => entities.decodeHTML5(value));
}

export function xmlEncode(sels: texty.Selection[]): texty.Selection[] {
  return process(sels, value => entities.encodeXML(value));
}

export function xmlDecode(sels: texty.Selection[]): texty.Selection[] {
  return process(sels, value => entities.decodeXML(value));
}

export function base64Encode(sels: texty.Selection[]): texty.Selection[] {
  return process(sels, value => new Buffer(value).toString('base64'));
}

export function base64Decode(sels: texty.Selection[]): texty.Selection[] {
  return process(sels, value => new Buffer(value, 'base64').toString('utf8'));
}

export function jwtDecode(sels: texty.Selection[]): texty.Selection[] {
  return process(sels, value => JSON.stringify(jwtDecoder(value), undefined, '  '));
}
