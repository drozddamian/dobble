import React from 'react'
import styled from 'styled-components'
import Card from '../../components/Card'
import { getCards } from '../../utils/cards'


const GameTableScreen = () => {

  const { firstTableCard , cards } = getCards()

  return (
      <Wrapper>
        <TableCenterContainer>
          <Card cardSymbols={firstTableCard} />
        </TableCenterContainer>
      </Wrapper>
  )
}


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const TableCenterContainer = styled.div`
  
`


export default GameTableScreen
