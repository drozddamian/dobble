import React, {ReactElement, useEffect} from 'react'
import styled, { css } from 'styled-components'
import { isNil, isEmpty } from 'ramda'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from "../../redux/rootReducer";
import PageWrapper from '../../components/Page/Container'
import RoomList from '../../components/RoomList'
import { fetchPopularRooms } from '../../redux/rooms'
import { useCurrentAccount } from '../../hooks'
import AuthSection from './AuthSection'
import PlayerSection from './PlayerSection'
import ComponentSwitcher from '../../components/ComponentSwitcher'

interface SectionTitleProps {
  width?: string;
  padding?: string;
}

const MainScreen: React.FC = () => {
  const dispatch = useDispatch()

  const { currentUserId } = useCurrentAccount()
  const { isLoading, rooms, mostPopularRooms } = useTypedSelector(state => state.rooms)

  useEffect(() => {
    dispatch(fetchPopularRooms())
  }, [])

  useEffect(() => {
    if (rooms.length > 5) {
      return
    }
    dispatch(fetchPopularRooms())
  }, [rooms.length])


  const componentSwitcherData = {
    ROOMS: {
      title: 'Top rooms',
      component: (
        <RoomList
          rooms={mostPopularRooms}
          isLoading={isLoading}
        />
      )
    },
    PLAYERS: {
      title: 'Top players',
      component: (
        <p>top players</p>
      )
    },
  }

  return (
    <MainPageWrapper>
      {isNil(currentUserId) || isEmpty(currentUserId)
        ? <AuthSection />
        : <PlayerSection userId={currentUserId} />
      }

      <TopSection>
        <ComponentSwitcher componentSwitcherData={componentSwitcherData} />
      </TopSection>
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
