import { useState } from 'react'
import { equals } from 'ramda'

interface HookResult {
  value: number;
  increase: () => void;
  decrease: () => void;
}

export const useNumberChanger = (minValue: number, maxValue: number): HookResult => {
  const [value, setValue] = useState(minValue)

  const increase = () => {
    if (equals(value, maxValue)) {
      return
    }
    setValue(value + 1)
  }

  const decrease = () => {
    if (equals(value, minValue)) {
      return
    }
    setValue(value - 1)
  }

  return {
    value,
    increase,
    decrease,
  }
}
