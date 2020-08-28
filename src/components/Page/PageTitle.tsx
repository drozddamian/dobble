import React from 'react'
import styled from 'styled-components'
import GoBackButton, { Button } from '../GoBackButton'

interface Props {
  title: string;
  isSubPage?: boolean;
}

const PageTitle: React.FC<Props> = (props: Props) => {
  const { title, isSubPage } = props

  return (
    <Wrapper>
      {isSubPage && (
        <GoBackButton />
      )}

      <Title>
        {title}
      </Title>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  ${Button} {
    margin-right: 8px;
  }
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.russo};
  font-size: ${({ theme }) => theme.fontSize.s27};
  color: ${({ theme }) => theme.colors.darkBlue};

  max-width: 235px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export default PageTitle
