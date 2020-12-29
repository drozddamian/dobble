import React, { useEffect } from 'react'
import styled from 'styled-components'
import { isNil, isEmpty } from 'ramda'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../redux/rootReducer'
import { fetchPopularRooms } from '../../redux/rooms'
import { fetchTopPlayers } from '../../redux/players'
import { useCurrentAccount } from '../../hooks'

import PageWrapper from '../../components/Page/Container'
import RoomList from '../../components/RoomList'
import TopPlayersList from '../../components/PlayerList/TopPlayers'
import AuthSection from './AuthSection'
import PlayerSection from './PlayerSection'
import ComponentSwitcher from '../../components/ComponentSwitcher'
import Chat from '../../components/Chat'

const MainScreen: React.FC = () => {
  const dispatch = useDispatch()
  const { currentUserId } = useCurrentAccount()
  const { isLoading: isLoadingRooms, rooms, mostPopularRooms } = useTypedSelector(state => state.rooms)
  const { isLoading: isLoadingPlayers, topPlayers } = useTypedSelector(state => state.players)

  useEffect(() => {
    dispatch(fetchPopularRooms())
    dispatch(fetchTopPlayers())
  }, [])

  useEffect(() => {
    if (rooms.length > 5) {
      return
    }
    dispatch(fetchPopularRooms())
  }, [rooms.length])


  const componentSwitcherData = {
    PLAYERS: {
      title: 'Top players',
      component: (
        <TopPlayersList
          players={topPlayers}
          isLoading={isLoadingPlayers}
        />
      )
    },
    ROOMS: {
      title: 'Top rooms',
      component: (
        <RoomList
          rooms={mostPopularRooms}
          isLoading={isLoadingRooms}
        />
      )
    },
  }

  return (
    <MainPageWrapper>
      {isNil(currentUserId) || isEmpty(currentUserId)
        ? <AuthSection />
        : <PlayerSection userId={currentUserId} />
      }

      <RightColumn>
        <TopSection>
          <ComponentSwitcher componentSwitcherData={componentSwitcherData} />
        </TopSection>

        <Chat />
      </RightColumn>
      </MainPageWrapper>
  )
}

const MainPageWrapper = styled(PageWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: ${({ theme }) => theme.rwd.desktop.xs}) {
    flex-direction: row;
    justify-content: space-around;
    align-items: baseline;
  }
`

const TopSection = styled.section`
  display: flex;
  flex-direction: column;
`

const RightColumn = styled.div`
  margin-top: 80px;
  width: 100%;
  max-width: 500px;
  
  @media (min-width: ${({ theme }) => theme.rwd.desktop.xs}) {
    padding-left: 40px;
  }
  @media (min-width: ${({ theme }) => theme.rwd.desktop.s}) {
    padding-left: 0;
  }
`

export default MainScreen
