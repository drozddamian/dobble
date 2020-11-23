import React from 'react'
import styled from 'styled-components'
import { useTransition, animated } from 'react-spring'

interface Props {
  text: string;
  height?: string;
  width?: string;
}

const SwingText: React.FC<Props> = (props: Props) => {
  const { text } = props

  const transitions = useTransition(text, null, {
    from: { transform: 'translate(-50%, -150%)' },
    enter: { transform: 'translate(-50%, -50%)' },
    leave: { transform: 'translate(-50%, 50%)', opacity: 0 },
  })

  return (
    <Wrapper>
      {transitions.map(({ item, key, props }) => item && (
        <Text key={key} style={props}>
          {text}
        </Text>
      ))}
    </Wrapper>
  )
}

export const Wrapper = styled(animated.div)`
  margin-left: 8px;
  padding: 0 4px;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  width: 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
`

const Text = styled(animated.span)`
  color: ${({ theme }) => theme.colors.softPink};
  position: absolute;
  top: 50%;
  left: 50%;
  transition: opacity .1s ease-out;
`

export default SwingText
