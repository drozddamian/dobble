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
import {joinGameSession} from '../../redux/game'

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
  const { isLoading: isJoiningGameInProcess } = useSelector(state => state.game)
  const userId = currentUserId || ''


  useEffect(() => {
    dispatch(fetchRoomItem(roomId))
  }, [])

  if (isLoading || isNil(roomItem)) {
    return (
      <LoadingBar />
    )
  }

  const { owner, players, howManyPlayers, availableSeats, gameSession } = roomItem

  const userStatus = getButtonData(currentUserId, owner._id, players)

  const isRoomFull = equals(howManyPlayers, availableSeats)
  const isUserToJoin = equals(userStatus, USER_STATUS.JOIN)
  const noSeatAvailableToJoin = isRoomFull && isUserToJoin
  const { buttonText, modalText, acceptModalText, action } = BUTTON_ACTION_DATA[userStatus]

  const handlePlayButtonClick = () => {
    if (isNil(currentUserId)) { return }
    dispatch(joinGameSession(gameSession, currentUserId))
  }

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
            isSmallButton
            text={buttonText}
            type='button'
            handleClick={handleInitializeModal}
            isDisabled={noSeatAvailableToJoin}
          />
        </RoomButtonsContainer>

        <GameSessionContainer>
          <ContainerTitle>
            Let's play the game!
          </ContainerTitle>


          <Button
            text='Play'
            type='button'
            handleClick={handlePlayButtonClick}
            isDisabled={isUserToJoin}
            isLoading={isJoiningGameInProcess}
          />
        </GameSessionContainer>

        <PlayerListContainer>
          <ContainerTitle>
            {getPlayersTitle(roomItem?.howManyPlayers)}
          </ContainerTitle>

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
  margin-bottom: 60px;
`

const PlayerListContainer = styled.div``

const ContainerTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.russo};
  font-size: ${({ theme }) => theme.fontSize.normalText};
  padding-bottom: 16px;
`

const GameSessionContainer = styled.div`
  margin: 60px 0;
`

export default RoomScreen
