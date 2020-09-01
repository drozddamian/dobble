import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { isNil, equals } from 'ramda'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PageWrapper from '../../components/Page/Container'
import { fetchRoomDetails } from '../../redux/room'
import PageTitle from '../../components/Page/PageTitle'
import LoadingBar from '../../components/Loader/LoadingBar'
import PlayerList from '../../components/PlayerList'
import Button from '../../components/Button'
import { Account } from '../../api/account'
import { USER_STATUS, BUTTON_ACTION_DATA } from './constant-data'
import { useCurrentAccount, useModal } from '../../hooks'
import Modal from '../../components/Modal'


function getPlayersTitle(howManyPlayers: number) {
  if (howManyPlayers < 2) {
    return 'One player in the room'
  }
  return `There is ${howManyPlayers} in the room`
}

const { OWNER, JOIN, LEAVE } = USER_STATUS

const isIdInPlayerList = (currentUserId) => (player) => {
  return !equals(player._id, currentUserId)
}

function getButtonData(currentUserId: string | null, ownerId: string, players: Account[]): USER_STATUS {
  if (isNil(currentUserId) || isNil(players)) {
    return JOIN
  }
  if (equals(currentUserId, ownerId)) {
    return OWNER
  }
  const playerInRoom = players.find(isIdInPlayerList(currentUserId))
  if (!isNil(playerInRoom)) {
    return LEAVE
  }
  return JOIN
}

const RoomScreen: React.FC = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const { isLoading, roomDetails } = useSelector(state => state.room)

  const { currentUserId } = useCurrentAccount()
  const userStatus = getButtonData(currentUserId, roomDetails?.owner._id, roomDetails?.players)

  const modalRef = useRef(null)
  const { isModalVisible, handleOpenModal, handleCloseModal } = useModal(modalRef)

  const { buttonText, modalText, acceptModalText } = BUTTON_ACTION_DATA[userStatus]

  const handleActionButtonClick = () => {
    handleOpenModal()
  }

  useEffect(() => {
    if (isNil(id)) {
      return
    }
    dispatch(fetchRoomDetails(id))
  }, [id])


  if (isLoading) {
    return (
      <LoadingBar />
    )
  }
  return (
    <>
      <PageTitle title={roomDetails?.name} isSubPage />

      <PageWrapper>
        <RoomButtonsContainer>
          <Button
            text={buttonText}
            type='button'
            handleClick={handleActionButtonClick}
          />
        </RoomButtonsContainer>

        <PlayerListContainer>
          <PlayersTitle>
            {getPlayersTitle(roomDetails?.howManyPlayers)}
          </PlayersTitle>

          <PlayerList
            owner={roomDetails?.owner.nick}
            players={roomDetails?.players}
          />
        </PlayerListContainer>
      </PageWrapper>

      <Modal
        ref={modalRef}
        isModalVisible={isModalVisible}
        text={modalText}
        acceptButtonText={acceptModalText}
        acceptButtonFunction={() => console.log('yes')}
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
