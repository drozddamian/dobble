import React from 'react'
import styled from 'styled-components'
import CARD_SYMBOLS from '../../../constants/symbols'
import { SymbolName } from '../../../types'

interface Props {
  symbolId: SymbolName;
  symbolScale: string;
  handleSymbolClick?: ((name: SymbolName) => void) | undefined;
}

interface SymbolProps {
  symbolScale: string;
}


const Symbol: React.FC<Props> = (props: Props) => {
  const { symbolId, symbolScale, handleSymbolClick } = props
  const { name, icon } = CARD_SYMBOLS[symbolId]

  return (
    <Wrapper onClick={() => handleSymbolClick && handleSymbolClick(symbolId)}>
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
  cursor: pointer;
`

const SymbolIcon = styled.img`
  width: 100%;
  ${(props: SymbolProps) => `
    transform: scale(${props.symbolScale});
  `};
`


export default Symbol
