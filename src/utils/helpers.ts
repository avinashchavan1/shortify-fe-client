import moment from 'moment';
import { regexUrl } from '../pages/home/Home.helpers';

export const isValidURL = (str: string) => {
  const pattern = new RegExp(regexUrl);
  return pattern.test(str);
};

export const formatDate = (date: string): string => {
  //   const dateStr = '2025-07-08T15:28:01';
  const formatted = moment(date).format('DD MMMM YYYY, h:mm A');

  return formatted;
};

function toPath(path: string | Array<string | number>): Array<string | number> {
  if (Array.isArray(path)) return path;
  // Convert 'a[0].b.c' or 'a.b.c' to ['a', '0', 'b', 'c']
  return path
    .replace(/\[(\w+)\]/g, '.$1')
    .replace(/^\./, '')
    .split('.')
    .map(key => (isNaN(Number(key)) ? key : Number(key)));
}

export function getValue<T, R = any>(
  object: T,
  path: string | Array<string | number>,
  defaultValue?: R
): R | undefined {
  const keys = toPath(path);
  let result: any = object;
  for (const key of keys) {
    if (result == null) return defaultValue;
    result = result[key];
  }
  return result === undefined ? defaultValue : result;
}
