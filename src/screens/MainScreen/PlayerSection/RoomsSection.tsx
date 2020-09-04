import React, {useRef, useState} from 'react'
import styled from 'styled-components'
import { SectionTitle } from '../index'
import ROUTES from '../../../constants/routes'
import Button from '../../../components/Button'
import Select from '../../../components/Select'
import RoomList from '../../../components/RoomList'
import { RoomTypes, selectRoomValues } from './constant-data'
import { Room } from '../../../api/room'
import Modal from '../../../components/Modal'
import { useModal } from '../../../hooks'
import CreateRoomForm from '../../../components/Forms/CreateRoom'
import { filterArrayByKey } from '../../../utils'

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

  const handleRoomsTypeChange = (event) => {
    const { value } = event.target
    setPlayerRoomsType(value)
  }

  const handleCreateRoomButtonClick = () => handleOpenModal()

  const ROOMS_TO_DISPLAY = {
    [ALL]: allRooms,
    [JOINED]: joinedRooms,
    [OWN]: owningRooms,
  }

  const playerRooms = ROOMS_TO_DISPLAY[playerRoomsType]

  return (
    <>
      <Wrapper>
        <RoomsSectionHeader>
          <TitleContainer>
            <SectionTitle>
              Your rooms
            </SectionTitle>

            <SeeAllRoomsButton href={ROUTES.ROOMS}>
              Show all...
            </SeeAllRoomsButton>
          </TitleContainer>

          <Button
            isSmallButton
            text='Create new'
            type='button'
            handleClick={handleCreateRoomButtonClick}
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
  justify-content: space-between;
  align-items: center;
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
`

const SelectContainer = styled.div`
  padding: 16px 0 8px;
`

const CreateRoomFormWrapper = styled.div`
  padding: 16px;
`

export default RoomsSection
