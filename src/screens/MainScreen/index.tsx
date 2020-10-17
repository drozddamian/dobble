import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import { isNil, isEmpty } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import PageWrapper from '../../components/Page/Container'
import RoomList from '../../components/RoomList'
import { fetchPopularRooms } from '../../redux/rooms'
import { useCurrentAccount } from '../../hooks'
import AuthSection from './AuthSection'
import PlayerSection from './PlayerSection'

interface SectionTitleProps {
  width?: string;
  padding?: string;
}

const MainScreen: React.FC = () => {
  const dispatch = useDispatch()

  const { currentUserId } = useCurrentAccount()
  const { isLoading, rooms, mostPopularRooms } = useSelector(state => state.rooms)

  useEffect(() => {
    dispatch(fetchPopularRooms())
  }, [])

  useEffect(() => {
    if (rooms.length > 5) {
      return
    }
    dispatch(fetchPopularRooms())
  }, [rooms.length])

  const getPlayerComponent = () => {
    if (isNil(currentUserId) || isEmpty(currentUserId)) {
      return <AuthSection />
    }
    return <PlayerSection userId={currentUserId} />
  }


  return (
    <MainPageWrapper>
      {getPlayerComponent()}

      <RoomsSection>
        <SectionTitle padding='0 0 40px 0'>
          Most popular rooms
        </SectionTitle>

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
  display: flex;
  font-family: ${({ theme }) => theme.fonts.russo};
  font-size: ${({ theme }) => theme.fonts.smallTitle};
  color: ${({ theme }) => theme.colors.darkBlue};
  width: 100%;
  ${(props: SectionTitleProps) => props.width && css`
    width: ${props.width};
  `};
  ${(props: SectionTitleProps) => props.padding && css`
    padding: ${props.padding};
  `};
  
  @media (min-width: ${({ theme }) => theme.rwd.desktop.xs}) {
    align-self: flex-start;
  }
`



export default MainScreen
