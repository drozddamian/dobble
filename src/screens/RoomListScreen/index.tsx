import React from 'react'
import styled from 'styled-components'
import RoomList from '../../components/RoomList'
import { RoomData } from '../../types'


const RoomListScreen = () => {

  const rooms: RoomData[] = [
    {
      name: '1st room',
      maxPlayers: 8,
      players: 3,
      isPrivateRoom: false,
    },
    {
      name: '2nd room',
      maxPlayers: 3,
      players: 1,
      isPrivateRoom: true,
    },
  ]

  return (
    <Wrapper>
      <RoomList rooms={rooms}/>
    </Wrapper>
  )
}

const Wrapper = styled.div`

`

export default RoomListScreen
