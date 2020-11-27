import React from 'react'
import { isEmpty } from 'ramda'
import styled from 'styled-components'
import theme from '../../utils/theme'
import { Player } from '../../api/players'
import LoadingBar from '../Loader/LoadingBar'
import { ItemWrapper, ItemTitle } from '../RoomList/RoomItems'
import NoItemsFound from '../UI/NoItemsFound'

interface Props {
  players: Player[];
  isLoading: boolean;
}

const TopPlayersList: React.FC<Props> = ({ players, isLoading }) => {
  if (isLoading) {
    return <LoadingBar />
  }
  if (isEmpty(players)) {
    return <NoItemsFound text='Hurry up! Podium is waiting for you' />
  }
  return (
    <Wrapper>
      {players.map((player, index) => {
        const { _id, level, nick } = player
        const playerProfileURL = `/player/${_id}`

        return (
          <ItemWrapper href={playerProfileURL} key={_id}>
            <PodiumPlaceNumber podiumPlace={index}>
              {index + 1}
            </PodiumPlaceNumber>

            <ItemTitle>
              {`${nick} ${level} lvl`}
            </ItemTitle>
          </ItemWrapper>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${ItemTitle} {
    font-size: ${({ theme }) => theme.fontSize.s17};
  }
`

const podiumColors = [
  theme.colors.gold,
  theme.colors.inputBorder,
  theme.colors.bronze,
]
const PodiumPlaceNumber = styled.span<{ podiumPlace: number }>`
  font-family: ${({ theme }) => theme.fonts.russo};
  font-size: ${({ theme }) => theme.fontSize.s23};
  color: ${(props) => podiumColors[props.podiumPlace]};
`

export default TopPlayersList
