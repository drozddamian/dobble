import React, { useEffect } from 'react'
import styled from 'styled-components'
import { isNil } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAccount } from '../../../redux/players'
import LoadingComponent from '../../../components/Loader/CircleLoader'
import theme from '../../../utils/theme'
import LevelProgress from '../../../components/LevelProgress'
import RoomsSection from './RoomsSection'


interface Props {
  userId: string;
}

const PlayerSection: React.FC<Props> = (props: Props) => {
  const { userId } = props
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAccount(userId))
  }, [])

  const { player, isLoading } = useSelector(state => state.players)

  if (isLoading || isNil(player)) {
    return <LoadingComponent color={theme.colors.white} />
  }

  const { nick, joinedRooms, owningRooms } = player

  return (
    <Wrapper>
      <PlayerInfoContainer>
        <LevelProgress
          level={23}
          progressLoaderSize={56}
        />
        <PlayerNick>
          {nick}
        </PlayerNick>
      </PlayerInfoContainer>

      <RoomsSection
        isLoading={isLoading}
        joinedRooms={joinedRooms}
        owningRooms={owningRooms}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
`

const PlayerNick = styled.h3`
  font-family: ${({ theme }) => theme.fonts.russo};
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.smallTitle};
  padding: 0;
  margin-left: 24px;
  max-width: 75%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const PlayerInfoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

export default PlayerSection
