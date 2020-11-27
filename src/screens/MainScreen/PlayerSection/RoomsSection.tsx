import React, { ChangeEvent, useRef, useState } from 'react'
import { equals } from 'ramda'
import styled from 'styled-components'
import ROUTES from '../../../constants/routes'
import { RoomTypes, selectRoomValues } from './constant-data'
import { Room } from '../../../api/rooms'
import { useModal } from '../../../hooks'
import { filterArrayByKey } from '../../../utils'
import CreateRoomForm from '../../../components/Forms/CreateRoom'
import Button from '../../../components/Button'
import Select from '../../../components/Select'
import RoomList from '../../../components/RoomList'
import Modal from '../../../components/Modal'
import SectionTitle from '../../../components/UI/SectionTitle'

interface Props {
  joinedRooms: Room[];
  owningRooms: Room[];
  isLoading: boolean;
}

const { ALL, JOINED, OWN } = selectRoomValues

const RoomsSection: React.FC<Props> = (props: Props) => {
  const { isLoading, joinedRooms, owningRooms } = props
  const modalRef = useRef(null)
  const { isModalVisible, handleOpenModal, handleCloseModal } = useModal(modalRef)

  const [playerRoomsType, setPlayerRoomsType] = useState<RoomTypes>(ALL)

  const valuesToDisplayInRoomSelector = Object.values(selectRoomValues)
  const allRooms = filterArrayByKey([...joinedRooms, ...owningRooms], '_id')

  const handleRoomsTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as RoomTypes
    setPlayerRoomsType(value)
  }

  const handleCreateRoomButtonClick = () => handleOpenModal()

  const ROOMS_TO_DISPLAY = {
    [ALL]: allRooms,
    [JOINED]: joinedRooms,
    [OWN]: owningRooms,
  }

  const hasOnlyOwnRooms = equals(owningRooms.length, allRooms.length)

  return (
    <>
      <Wrapper>
        <RoomsSectionHeader>
          <TitleContainer>
            <SectionTitle>
              Your rooms
            </SectionTitle>

            <SeeAllRoomsButton href={ROUTES.ROOMS}>
              Show all
            </SeeAllRoomsButton>
          </TitleContainer>

          <Button
            isSmallButton
            text='Create new'
            type='button'
            handleClick={handleCreateRoomButtonClick}
          />
        </RoomsSectionHeader>

        {!hasOnlyOwnRooms && (
          <SelectContainer>
            <Select
              name='roomsType'
              values={valuesToDisplayInRoomSelector}
              onChange={handleRoomsTypeChange}
            />
          </SelectContainer>
        )}

        <RoomList
          rooms={ROOMS_TO_DISPLAY[playerRoomsType]}
          isLoading={isLoading}
        />
      </Wrapper>

      <Modal isModalVisible={isModalVisible}>
        <CreateRoomFormWrapper>
          <CreateRoomForm handleCancelClick={handleCloseModal} />
        </CreateRoomFormWrapper>
      </Modal>
    </>
  )
}

const Wrapper = styled.div`
  padding-top: 40px;
`

const RoomsSectionHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
`

const TitleContainer = styled.div`
  display: flex;
`

const SeeAllRoomsButton = styled.a`
  font-family: ${({ theme }) => theme.fonts.robotoBold};
  color: ${({ theme }) => theme.colors.info};
  align-self: flex-end;
  margin-bottom: 3px;
  padding-left: 8px;
  white-space: nowrap;
`

const SelectContainer = styled.div`
  padding-bottom: 8px;
`

const CreateRoomFormWrapper = styled.div`
  padding: 16px;
`

export default RoomsSection
