import React from 'react'
import styled from 'styled-components'

interface Props {
  name: string;
  icon: string;
  symbolScale: string;
}

interface SymbolProps {
  symbolScale: string;
}


const Symbol: React.FC<Props> = (props: Props) => {
  const { name, icon, symbolScale } = props

  return (
    <Wrapper>
      <SymbolIcon
        src={icon}
        symbolScale={symbolScale}
        alt={name}
      />
    </Wrapper>
  )
}


export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SymbolIcon = styled.img`
  width: 100%;
  ${(props: SymbolProps) => `
    transform: scale(${props.symbolScale});
  `};
`


export default Symbol
