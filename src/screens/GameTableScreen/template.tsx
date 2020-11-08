import React, { ReactElement } from 'react'
import styled from 'styled-components'
import Button from '../../components/Button'
import GameDialog from '../../components/GameTable/GameDialog'
import GameTable from '../../components/GameTable'
import { SymbolName } from '../../types'
import {Player} from "../../api/players";
import {isEmpty} from "ramda";


interface Props {
  tableId: string;
  isGameInProcess: boolean;
  playerList: Player[];
  onLeaveGame: () => void;
  onStartRound: () => void;
  onSymbolClick: (spottedSymbol: SymbolName) => void;
}

const GameTableScreenTemplate: React.FC<Props> = (props: Props): ReactElement => {
  const { tableId, isGameInProcess, playerList, onLeaveGame, onStartRound, onSymbolClick } = props

  return (
    <Wrapper>
      {!isGameInProcess && (
        <>
          <Button
            isSmallButton
            text='Leave game session'
            type='button'
            handleClick={onLeaveGame}
          />
          <StartRoundWrapper>
            <GameDialog tableId={tableId} handleRoundStartClick={onStartRound} />
          </StartRoundWrapper>
        </>
      )}

      <GameTable handleSymbolClick={onSymbolClick} />

      <PlayersContainer>
        {!isEmpty(playerList) && playerList.map((player) => (
          <li key={player._id}>
            {player}
          </li>
        ))}
      </PlayersContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const StartRoundWrapper = styled.div`
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.white08};
`

const PlayersContainer = styled.ul`

`

export default GameTableScreenTemplate
