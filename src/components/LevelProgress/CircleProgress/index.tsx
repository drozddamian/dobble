import React from 'react'
import styled from 'styled-components'
import theme from "../../../utils/theme";

interface Props {
  levelProgression: number;
  progressLoaderSize: number;
  progressColor: string;
}

const CircleProgress: React.FC<Props> = (props: Props) => {
  const { levelProgression, progressLoaderSize, progressColor } = props

  const halfOfProgressLoaderSize = progressLoaderSize / 2
  const radius = progressLoaderSize / 2 - 3 / 2;
  const circumference = 2 * Math.PI * halfOfProgressLoaderSize;
  const progressOffset = ((100 - levelProgression) / 100) * circumference

  return (
    <Wrapper>
      <svg width={progressLoaderSize} height={progressLoaderSize}>
        <circle
          fill='transparent'
          stroke={theme.colors.inputBorder}
          cx={halfOfProgressLoaderSize}
          cy={halfOfProgressLoaderSize}
          r={radius}
          strokeWidth='3'
        />
        <circle
          fill='transparent'
          stroke={progressColor}
          cx={halfOfProgressLoaderSize}
          cy={halfOfProgressLoaderSize}
          r={radius}
          strokeWidth='3'
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
        />
      </svg>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`

export default CircleProgress
