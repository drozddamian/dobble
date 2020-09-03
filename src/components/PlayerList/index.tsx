import React from 'react'
import { isNil, equals } from 'ramda'
import styled from 'styled-components'
import { Account } from '../../api/account'
import PlayerListItem from './PlayerListItem'

interface Props {
  owner: string;
  players: Account[];
}

const PlayerList: React.FC<Props> = (props: Props) => {
  const { owner, players } = props

  if (isNil(players)) {
    return null
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
