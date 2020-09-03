import React, { useState } from 'react'
import styled from 'styled-components'
import { SectionTitle } from '../index'
import Button from '../../../components/Button'
import Select from '../../../components/Select'
import RoomList from '../../../components/RoomList'
import { RoomTypes, selectRoomValues } from './constant-data'
import { Room } from '../../../api/room'

interface Props {
  joinedRooms: Room[];
  owningRooms: Room[];
  isLoading: boolean;
}

const { ALL, JOINED, OWN } = selectRoomValues

const RoomsSection: React.FC<Props> = (props: Props) => {
  const { isLoading, joinedRooms, owningRooms } = props
  const [playerRoomsType, setPlayerRoomsType] = useState<RoomTypes>(ALL)

  const valuesToDisplayInRoomSelector = Object.values(selectRoomValues)
  const allRooms = [...new Set([...joinedRooms, ...owningRooms])]

  const handleRoomsTypeChange = (event) => {
    const { value } = event.target
    setPlayerRoomsType(value)
  }

  const ROOMS_TO_DISPLAY = {
    [ALL]: allRooms,
    [JOINED]: joinedRooms,
    [OWN]: owningRooms,
  }

  const playerRooms = ROOMS_TO_DISPLAY[playerRoomsType]

  return (
    <Wrapper>
      <RoomsSectionHeader>
        <SectionTitle>
          Your rooms
        </SectionTitle>

        <Button
          isSmallButton
          text='Create new'
          type='button'
        />
      </RoomsSectionHeader>

      <SelectContainer>
        <Select
          name='roomsType'
          values={valuesToDisplayInRoomSelector}
          onChange={handleRoomsTypeChange}
        />
      </SelectContainer>

      <RoomList
        rooms={playerRooms}
        isLoading={isLoading}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-top: 40px;
`

const RoomsSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SelectContainer = styled.div`
  padding: 16px 0 8px;
`

export default RoomsSection
