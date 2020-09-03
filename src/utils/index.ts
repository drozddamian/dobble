import { equals } from 'ramda'

export function filterArrayByKey(array, key: string) {
  const uniqueKeyArray = Array.from(new Set(array.map(a => a[key])))
  const uniqueItemsWithProperties = uniqueKeyArray
    .map((id) => array.find(a => equals(a[key], id)))

  return uniqueItemsWithProperties
}
