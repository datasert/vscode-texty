import * as entities from "entities";
import jwtDecoder from "jwt-decode";

export function urlEncode(sel: string): string {
  return encodeURIComponent(sel);
}

export function urlDecode(sel: string): string {
  return decodeURIComponent(sel);
}

export function htmlEncode(sel: string): string {
  return entities.encodeHTML5(sel);
}

export function htmlDecode(sel: string): string {
  return entities.decodeHTML5(sel);
}

export function xmlEncode(sel: string): string {
  return entities.encodeXML(sel);
}

export function xmlDecode(sel: string): string {
  return entities.decodeXML(sel);
}

export function base64Encode(sel: string): string {
  return new Buffer(sel).toString('base64');
}

export function base64Decode(sel: string): string {
  return new Buffer(sel, 'base64').toString('utf8');
}

export function jwtDecode(sel: string): string {
  return JSON.stringify(jwtDecoder(sel), undefined, '  ');
}
