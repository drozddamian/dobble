import React from 'react'
import styled from 'styled-components'

interface Props {
  text?: string;
}

const NoItemsFound: React.FC<Props> = ({
  text = 'No items found'
}) => (
  <Wrapper>
    <NoItemsText>
      {text}
    </NoItemsText>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  box-shadow: 0 7px 30px -10px rgba(150,170,180,0.2);
`

const NoItemsText = styled.p`
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  color: ${({ theme }) => theme.colors.inputBorder};
`

export default NoItemsFound