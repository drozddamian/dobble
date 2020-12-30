import React from 'react'
import { equals, isEmpty } from 'ramda'
import styled from 'styled-components'
import { Player } from '../../api/players'
import PlayerListItem from './PlayerListItem'
import LoadingBar from '../Loader/LoadingBar'
import NoItemsFound from '../UI/NoItemsFound'

interface Props {
  owner?: string;
  players: Player[];
  isLoading: boolean;
}

const PlayerList: React.FC<Props> = ({ owner, players, isLoading }) => {
  if (isLoading) {
    return <LoadingBar />
  }
  if (isEmpty(players)) {
    return <NoItemsFound text='Player list is empty' />
  }
  return (
    <Wrapper>
      {players.map((player) => {
        const { username, nick } = player
        const isRoomOwner = equals(owner, nick)

        return (
          <PlayerListItem
            key={username}
            nick={nick}
            isRoomOwner={isRoomOwner}
          />
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`

`

export default PlayerList
