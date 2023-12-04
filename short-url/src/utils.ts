import * as base62 from 'base62';

export function generateRandomStr(len: number): string {
  let str: string = '';
  for (let i = 0; i < len; i++) {
    const num = Math.floor(Math.random() * 62);
    str += base62.encode(num);
  }
  return str;
}
