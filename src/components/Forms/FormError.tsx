import React from 'react'
import styled from 'styled-components'

interface Props {
  text: string;
}

const FormError: React.FC<Props> = (props: Props) => {
  const { text } = props

  return (
    <Wrapper>
      <ErrorText>
        {text && text}
      </ErrorText>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 18px;
  margin: -10px 0 12px 0;
`

const ErrorText = styled.p`
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  font-size: ${({ theme }) => theme.fontSize.smallText};
  color: ${({ theme }) => theme.colors.error};
`


export default FormError
