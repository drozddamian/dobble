import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { equals, isNil } from 'ramda'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PageWrapper from '../../components/Page/Container'
import { fetchRoomItem } from '../../redux/rooms'
import { displayNotification } from '../../redux/notification'
import PageTitle from '../../components/Page/PageTitle'
import LoadingBar from '../../components/Loader/LoadingBar'
import PlayerList from '../../components/PlayerList'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import { Player } from '../../api/players'
import { NotificationType } from '../../types'
import { BUTTON_ACTION_DATA, USER_STATUS } from './constant-data'
import { useCurrentAccount, useModal } from '../../hooks'

const { OWNER, JOIN, LEAVE } = USER_STATUS


function getPlayersTitle(howManyPlayers: number) {
  if (howManyPlayers < 2) {
    return 'One player in the room'
  }
  return `There is ${howManyPlayers} in the room`
}


const isIdInPlayerList = (currentUserId) => (player) => {
  return equals(player._id, currentUserId)
}


function getButtonData(currentUserId: string | null, ownerId: string, players: Player[]): USER_STATUS {
  if (isNil(currentUserId)) {
    return JOIN
  }
  if (equals(currentUserId, ownerId)) {
    return OWNER
  }
  const isPlayerInRoom = players.some(isIdInPlayerList(currentUserId))
  if (!isPlayerInRoom) {
    return JOIN
  }
  return LEAVE
}



const RoomScreen: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id: roomId } = useParams()
  const modalRef = useRef(null)
  const { isModalVisible, handleOpenModal, handleCloseModal } = useModal(modalRef)
  const { currentUserId } = useCurrentAccount()


  const { isLoading, roomItem } = useSelector(state => state.rooms)
  const userId = currentUserId || ''

  useEffect(() => {
    dispatch(fetchRoomItem(roomId))
  }, [])


  if (isLoading || isNil(roomItem)) {
    return (
      <LoadingBar />
    )
  }

  const { owner, players, howManyPlayers, availableSeats } = roomItem

  const userStatus = getButtonData(currentUserId, owner._id, players)

  const isRoomFull = equals(howManyPlayers, availableSeats)
  const isUserToJoin = equals(userStatus, USER_STATUS.JOIN)
  const noSeatAvailableToJoin = isRoomFull && isUserToJoin
  const { buttonText, modalText, acceptModalText, action } = BUTTON_ACTION_DATA[userStatus]

  const handleInitializeModal = () => {
    if (noSeatAvailableToJoin) {
      dispatch(displayNotification(NotificationType.ERROR, 'Sorry, there is no seat available'))
      return
    }
    handleOpenModal()
  }

  const handleAcceptModalButton = () => {
    if (userStatus === USER_STATUS.OWNER) {
      dispatch(action(roomId, history))
      return
    }
    dispatch(action(roomId, userId, history))
  }

  return (
    <>
      <PageTitle title={roomItem?.name} isSubPage />

      <PageWrapper>
        <RoomButtonsContainer>
          <Button
            text={buttonText}
            type='button'
            handleClick={handleInitializeModal}
            isDisabled={noSeatAvailableToJoin}
          />
        </RoomButtonsContainer>

        <PlayerListContainer>
          <PlayersTitle>
            {getPlayersTitle(roomItem?.howManyPlayers)}
          </PlayersTitle>

          <PlayerList
            owner={roomItem?.owner.nick}
            players={roomItem?.players}
          />
        </PlayerListContainer>
      </PageWrapper>

      <Modal
        ref={modalRef}
        isModalVisible={isModalVisible}
        text={modalText}
        acceptButtonText={acceptModalText}
        acceptButtonFunction={handleAcceptModalButton}
        declineButtonText='Cancel'
        declineButtonFunction={handleCloseModal}
      />
    </>
  )
}

const RoomButtonsContainer = styled.div`
  margin: 25px 0 60px 0;
`

const PlayerListContainer = styled.div``

const PlayersTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.russo};
  font-size: ${({ theme }) => theme.fontSize.normalText};
  padding-bottom: 16px;
`

export default RoomScreen
