import React from 'react'
import styled from 'styled-components'
import LevelProgress from '../LevelProgress'
import { useTypedSelector } from '../../redux/rootReducer'

const PlayerBadge: React.FC = () => {
  const { player } = useTypedSelector(state => state.players)

  if (!player) {
    return null
  }

  const { _id, nick, level, percentToNextLevel } = player

  return (
    <Wrapper>
      <LevelProgress
        level={level}
        percentToNextLevel={percentToNextLevel}
        progressLoaderSize={56}
      />
      <PlayerNick href={`/player/${_id}`}>
        {nick}
      </PlayerNick>
    </Wrapper>
  )
}

const PlayerNick = styled.a`
  font-family: ${({ theme }) => theme.fonts.russo};
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.smallTitle};
  padding: 0;
  margin-left: 24px;
  max-width: 75%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color .2s ease-out;
  
  :hover {
    color: ${({ theme }) => theme.colors.darkBlue08};
  }
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

export default PlayerBadge
