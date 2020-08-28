import React from 'react'
import styled, { css } from 'styled-components'
import { isEmpty } from 'ramda'
import { Room } from '../../api/room'
import LoadingBar from '../Loader/LoadingBar'
import RoomItems from './RoomItems'

interface Props {
  rooms: Room[];
  isLoading: boolean;
}

interface ContainerProps {
  isLoading: boolean;
}

const RoomList: React.FC<Props> = (props: Props) => {
  const { rooms, isLoading } = props

  const renderRoomList = () => {
    if (isLoading) {
      return (
        <LoadingBar />
      )
    }

    return isEmpty(rooms)
      ? <Text>There is no rooms yet!</Text>
      : <RoomItems rooms={rooms} />
  }


  return (
    <Wrapper isLoading={isLoading}>
      {renderRoomList()}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 7px 30px -10px rgba(150,170,180,0.5);
  
  ${(props: ContainerProps) => props.isLoading && css`
    align-items: center;
  `};
`

const Text = styled.p``

export default RoomList
