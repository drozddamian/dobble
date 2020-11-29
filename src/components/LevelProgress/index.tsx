import React from 'react'
import styled from 'styled-components'
import CircleProgress from './CircleProgress'
import theme from "../../utils/theme";

interface Props {
  level: number;
  percentToNextLevel: number;
  progressLoaderSize: number;
}

const LevelProgress: React.FC<Props> = (props: Props) => {
  const { level, percentToNextLevel, progressLoaderSize } = props

  return (
    <Wrapper>
      <PlayerLevel>
        {level}
      </PlayerLevel>

      <LevelText>
        LVL
      </LevelText>

      <CircleProgress
        levelProgression={percentToNextLevel}
        progressLoaderSize={progressLoaderSize}
        progressColor={theme.colors.pink}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  font-family: ${({ theme }) => theme.fonts.russo};
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const PlayerLevel = styled.span`
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.s23};
`

const LevelText = styled.span`
  cursor: default;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 5;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.s12};
`

export default LevelProgress
