import React from 'react'
import styled from 'styled-components'
import { RoomData } from '../../types'

interface Props {
  rooms: RoomData[];
}

const RoomList: React.FC<Props> = (props: Props) => {
  const { rooms } = props

  return (
    <Wrapper>
      {rooms.map((room) => (
        <p>
          {room.name}
        </p>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`

`

export default RoomList
