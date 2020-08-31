import React, { useEffect } from 'react'
import styled from 'styled-components'
import { isNil } from 'ramda'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PageWrapper from '../../components/Page/Container'
import { fetchRoomDetails } from '../../redux/room'
import PageTitle from '../../components/Page/PageTitle'
import LoadingBar from '../../components/Loader/LoadingBar'
import PlayerList from '../../components/PlayerList'
import Button from "../../components/Button";

const RoomScreen: React.FC = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const { isLoading, roomDetails } = useSelector(state => state.room)

  useEffect(() => {
    if (isNil(id)) {
      return
    }
    dispatch(fetchRoomDetails(id))
  }, [id])

  function getPlayersTitle() {
    const howManyPlayers = roomDetails?.howManyPlayers
    if (howManyPlayers < 2) {
      return 'One player in the room'
    }
    return `There is ${howManyPlayers} in the room`
  }

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
            text='Join room'
            type='button'
          />
        </RoomButtonsContainer>

        <PlayerListContainer>
          <PlayersTitle>
            {getPlayersTitle()}
          </PlayersTitle>

          <PlayerList
            owner={roomDetails?.owner.nick}
            players={roomDetails?.players}
          />
        </PlayerListContainer>

      </PageWrapper>
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
