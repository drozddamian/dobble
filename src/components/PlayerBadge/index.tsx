import React from 'react'
import styled from 'styled-components'
import LevelProgress from '../LevelProgress'
import { Player } from '../../api/players'

interface Props {
  player: Player;
}

const PlayerBadge: React.FC<Props> = (props: Props) => {
  const { player } = props
  const { nick, level, percentToNextLevel } = player

  return (
    <Wrapper>
      <LevelProgress
        level={level}
        percentToNextLevel={percentToNextLevel}
        progressLoaderSize={56}
      />
      <PlayerNick>
        {nick}
      </PlayerNick>
    </Wrapper>
  )
}

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

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

export default PlayerBadge
