import React from 'react'
import styled, { css } from 'styled-components'
import { isEmpty } from 'ramda'
import { Room } from '../../api/rooms'
import LoadingBar from '../Loader/LoadingBar'
import RoomItems from './RoomItems'
import NoItemsFound from '../UI/NoItemsFound'

interface Props {
  rooms?: Room[];
  isLoading: boolean;
}

const RoomList: React.FC<Props> = ({ rooms, isLoading }) => {
  if (isLoading) {
    return <LoadingBar />
  }
  if (!rooms || isEmpty(rooms)) {
    return <NoItemsFound text='Room list is empty' />
  }
  return (
    <Wrapper isLoading={isLoading}>
      <RoomItems rooms={rooms} />
    </Wrapper>
  )
}

const Wrapper = styled.div<{ isLoading: boolean }>`
  display: flex;
  flex-direction: column;
  
  ${(props) => props.isLoading && css`
    align-items: center;
  `};
`

export default RoomList
