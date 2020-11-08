import { equals } from 'ramda'

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function filterArrayByKey<T>(array: T[], key: keyof T): T[] {
  const uniqueKeyArray = Array.from(new Set(array.map(a => a[key])))
  const uniqueItemsWithProperties = uniqueKeyArray
    .map((id) => {
      return array.find(a => equals(a[key], id)) ?? null
    })
    .filter(notEmpty)

  return uniqueItemsWithProperties
}
