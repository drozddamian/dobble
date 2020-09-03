import React, { useEffect } from 'react'
import styled from 'styled-components'
import { isNil } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import PageWrapper from '../../components/Page/Container'
import RoomList from '../../components/RoomList'
import { fetchPopularRooms } from '../../redux/room'
import { useCurrentAccount } from '../../hooks'
import AuthSection from './AuthSection'
import PlayerSection from './PlayerSection'



const MainScreen: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPopularRooms())
  }, [])

  const { currentUserId } = useCurrentAccount()
  const { isLoading, mostPopularRooms } = useSelector(state => state.room)

  const getPlayerComponent = () => {
    if (isNil(currentUserId)) {
      return <AuthSection />
    }
    return <PlayerSection userId={currentUserId} />
  }


  return (
    <MainPageWrapper>
      {getPlayerComponent()}

      <RoomsSection>
        <RoomSectionTitle>
          Most popular rooms
        </RoomSectionTitle>

        <RoomList
          rooms={mostPopularRooms}
          isLoading={isLoading}
        />
      </RoomsSection>
    </MainPageWrapper>
  )
}

const MainPageWrapper = styled(PageWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: ${({ theme }) => theme.rwd.desktop.xs}) {
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
  }
`

const RoomsSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  width: 100%;
  max-width: 500px;
`

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.russo};
  font-size: ${({ theme }) => theme.fonts.smallTitle};
  color: ${({ theme }) => theme.colors.darkBlue};
  padding-bottom: 40px;
  width: 100px;
  display: flex;
  
  @media (min-width: ${({ theme }) => theme.rwd.desktop.xs}) {
    align-self: flex-start;
  }
`

const RoomSectionTitle = styled(SectionTitle)`
  width: 100%;
`


export default MainScreen
