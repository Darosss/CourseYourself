import { Transform } from 'class-transformer';

export function ArrayToNumbers(): (target: any, key: string) => void {
  return Transform(({ value }) => value.toString().split(',').map(Number));
}
