import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { equals, isNil } from 'ramda'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PageWrapper from '../../components/Page/Container'
import { fetchRoomItem } from '../../redux/rooms'
import PageTitle from '../../components/Page/PageTitle'
import LoadingBar from '../../components/Loader/LoadingBar'
import PlayerList from '../../components/PlayerList'
import Button from '../../components/Button'
import { Player } from '../../api/players'
import { BUTTON_ACTION_DATA, USER_STATUS } from './constant-data'
import { useCurrentAccount, useModal } from '../../hooks'
import Modal from '../../components/Modal'

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

  useEffect(() => {
    dispatch(fetchRoomItem(roomId))
  }, [])

  const { isLoading, roomItem } = useSelector(state => state.rooms)

  const { currentUserId } = useCurrentAccount()
  const userId = currentUserId || ''


  if (isLoading || isNil(roomItem)) {
    return (
      <LoadingBar />
    )
  }

  const userStatus = getButtonData(currentUserId, roomItem.owner._id, roomItem.players)
  const { buttonText, modalText, acceptModalText, action } = BUTTON_ACTION_DATA[userStatus]

  const handleAcceptModalButton = () => {
    if (userStatus === USER_STATUS.OWNER) {
      // @ts-ignore
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
            handleClick={handleOpenModal}
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
