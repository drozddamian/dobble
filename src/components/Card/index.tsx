import React from 'react'
import { isNil } from 'ramda'
import styled from 'styled-components'
import Symbol, { Wrapper as SymbolWrapper } from './Symbol'
import { Card, SymbolName } from '../../types'
import { getSymbolScales } from '../../utils/cards'

interface Props {
  cardSymbols: Card | null;
  handleSymbolClick?: (name: SymbolName) => (event: React.MouseEvent) => void;
}

interface WrapperProps {
  cardRotation: number;
  isClickable: boolean;
}

const CardComponent: React.FC<Props> = (props: Props) => {
  const { cardSymbols, handleSymbolClick } = props

  const symbolScaleArray = getSymbolScales()
  const cardRotation = !cardSymbols ? 0 : Math.floor(Math.random() * 360)

  return (
    <Wrapper>
      <CardContainer cardRotation={cardRotation} isClickable={!isNil(handleSymbolClick)}>
        {!cardSymbols
          ? <EmptyCardContent>Empty card</EmptyCardContent>
          : cardSymbols.map((symbolId, index) => (
            <Symbol
              key={`${symbolId}_${index}`}
              symbolId={symbolId}
              symbolScale={symbolScaleArray[index]}
              handleSymbolClick={handleSymbolClick}
            />
          ))
        }
      </CardContainer>
    </Wrapper>
  )
}


export const Wrapper = styled.div`
  width: 340px;
  height: 340px;
  box-shadow: 0 10px 19px 0 rgba(224,220,224,1);
  border-radius: 50%;
  background: white;
`

const EmptyCardContent = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%);
  font-family: ${({ theme }) => theme.fonts.russo};
`

const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  ${(props: WrapperProps) => props.cardRotation && `
    transform: rotate(${props.cardRotation}deg);
  `};

  ${SymbolWrapper} {
    position: absolute;
    width: 80px;
    height: 80px;
    
    ${(props: WrapperProps) => !props.isClickable && `
      cursor: not-allowed;      
    `};

    :first-of-type {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%)
        ${(props: WrapperProps) => props.cardRotation && `
          rotate(-${props.cardRotation}deg);
        `};
      ;
    }

    :nth-of-type(2) {
      top: 25px;
      left: 35%;
      transform: translateX(-35%) rotate(170deg);
    }

    :nth-of-type(3) {
      top: 35px;
      left: 75%;
      transform: translateX(-75%) rotate(222deg);
    }

    :nth-of-type(4) {
      top: 45%;
      right: 15px;
      transform: translateY(-45%) rotate(274deg);
    }

    :nth-of-type(5) {
      bottom: 50px;
      right: 48px;
      transform: rotate(326deg)
    }

    :nth-of-type(6) {
      left: 48%;
      bottom: 15px;
      transform: translateX(-48%) rotate(18deg);
    }

    :nth-of-type(7) {
      left: 15%;
      bottom: 65px;
      transform: translateX(-15%) rotate(70deg);
    }

    :nth-of-type(8) {
      left: 20px;
      top: 38%;
      transform: translateY(-38%) rotate(112deg);
    }
  }
`



export default CardComponent
