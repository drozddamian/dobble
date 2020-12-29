import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { isEmpty } from 'ramda'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useCurrentAccount } from '../../hooks'
import { useTypedSelector } from '../../redux/rootReducer'
import { fetchPlayer } from '../../redux/players'

import PageTitle from '../../components/Page/PageTitle'
import PageWrapper from '../../components/Page/Container'
import LoadingBar from '../../components/Loader/LoadingBar'
import RoomItems from '../../components/RoomList/RoomItems'
import Chart from '../../components/Chart'
import { WinGame } from '../../types'

const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const PlayerScreen: React.FC = () => {
  const dispatch = useDispatch()
  const { id: playerId } = useParams()
  const { currentUserId } = useCurrentAccount()

  const { isLoading, player } = useTypedSelector(state => state.players)

  useEffect(() => {
    if (!playerId) {
      return
    }
    dispatch(fetchPlayer(playerId))
  }, [playerId])

  if (isLoading) {
    return <LoadingBar />
  }

  if (!player) {
    return <p>error</p>
  }

  const isProfileOwner = currentUserId === playerId

  const {
    nick,
    level,
    experience,
    experienceToNextLevel,
    percentToNextLevel,
    owningRooms,
    winGames,
  } = player

  const mapWinGamesDataForChart = (winGames: WinGame[]): WinGame[] => {
    return winGames.map((win) => {
      return ({
        ...win,
        timestamp: dayjs(win.timestamp).format("YYYY/MM/DD H:mm")
      })
    })
  }

  return (
    <>
      <PageTitle title='Profile page' isSubPage />

      <PageWrapper>
        <Wrapper>
          <Tile>
            <MainTileTitle>
              {isProfileOwner
                ? `Welcome back ${nick}!`
                : nick
              }
            </MainTileTitle>

            <LevelStatistics>
              <LevelTitle>
                Level
              </LevelTitle>

              <LevelBar levelPercentage={percentToNextLevel} />

              <LevelBarLegend>
                <LegendText>
                  {level}
                </LegendText>
                <LegendText>
                  {`${experience} / ${experienceToNextLevel} exp`}
                </LegendText>
                <LegendText>
                  {level + 1}
                </LegendText>
              </LevelBarLegend>
            </LevelStatistics>
          </Tile>

          {!isEmpty(owningRooms) && (
            <Tile>
              <TileTitle>Rooms</TileTitle>
              <RoomItems rooms={owningRooms} />
            </Tile>
          )}

          {winGames.length > 0 && (
            <Tile>
              <TileTitle>Victories{` (${winGames.length})`}</TileTitle>

              <Chart
                data={mapWinGamesDataForChart(winGames)}
                tooltipLabel='Duration of the round'
                dataKey='durationOfGame'
                xAxisDataKey='timestamp'
              />
            </Tile>
          )}
        </Wrapper>
      </PageWrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Tile = styled.div<{ minWidth?: string, backgroundColor?: string }>`
  margin: 15px 0;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 3px 10px 1px rgba(209,209,209,1);
  background-color: ${(props) => props.backgroundColor ||  props.theme.colors.white};
  min-width: ${(props) => props.minWidth || '300px'};
  
  @media (min-width: ${({ theme }) => theme.rwd.mobile.s}) {
    margin: 15px;
    padding: 16px;
  }
  
  @media (min-width: ${({ theme }) => theme.rwd.mobile.m}) {
    min-width: 500px;
  }
`

const MainTileTitle = styled.h3`
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.s23};
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  
  @media (min-width: ${({ theme }) => theme.rwd.mobile.s}) {
    font-size: ${({ theme }) => theme.fontSize.smallTitle};
  }
`

const TileTitle = styled.h4`
  padding-bottom: 30px;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.s18};
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  
  @media (min-width: ${({ theme }) => theme.rwd.mobile.s}) {
    font-size: ${({ theme }) => theme.fontSize.s27};
  }
`

const LevelTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.s18};
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  color: ${({ theme }) => theme.colors.text};
  
  @media (min-width: ${({ theme }) => theme.rwd.mobile.s}) {
    font-size: ${({ theme }) => theme.fontSize.s21};  
  }
`

const LevelStatistics = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
`

const LevelBar = styled.div<{ levelPercentage: number }>`
  height: 10px;
  margin: 15px 0 8px;
  position: relative;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white08};
  box-shadow: 0 3px 10px 1px rgba(209,209,209,1);
  
  :after {
    content: "";
    position: absolute;
    height: 100%;
    border-radius: 5px;
    width: ${(props) => `${props.levelPercentage}%`};
    background: linear-gradient(90deg, rgba(19,60,119,1) 45%, rgba(19,39,119,0.8) 100%);
  }
`

const LevelBarLegend = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`

const LegendText = styled.span`
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.smallText};
`

export default PlayerScreen
