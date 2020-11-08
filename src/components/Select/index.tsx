import React, { ChangeEvent } from 'react'
import styled from 'styled-components'


interface Props {
  name: string;
  values: string[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<Props> = (props: Props) => {
  const { name, values, onChange } = props

  return (
    <SelectInput name={name} onChange={onChange}>
      {values.map((value) => (
        <option
          key={value}
          value={value}
        >
          {value}
        </option>
      ))}
    </SelectInput>
  )
}

const SelectInput = styled.select`
  font-family: ${({ theme }) => theme.fonts.russo};
  font-size: ${({ theme }) => theme.fontSize.smallText};
  color: ${({ theme }) => theme.colors.darkBlue};
  border: none;
  outline: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.darkBlue08};
`

export default Select
