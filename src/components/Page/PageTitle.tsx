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
  margin-top: 16px;
  
  ${Button} {
    margin-right: 8px;
  }
  
  @media (min-width: ${({ theme })=> theme.rwd.mobile.m}) {
    justify-content: flex-start;
    padding-left: 40px;
  }
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.russo};
  font-size: ${({ theme }) => theme.fontSize.s27};
  color: ${({ theme }) => theme.colors.darkBlue};
  max-width: 290px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
  @media (min-width: ${({ theme })=> theme.rwd.mobile.s}) {
    min-width: 350px;
  }
  
  @media (min-width: ${({ theme })=> theme.rwd.mobile.m}) {
    min-width: 500px;
  }
  
  @media (min-width: ${({ theme })=> theme.rwd.tablet.s}) {
    white-space: normal;
    min-width: 90%;
  }
`

export default PageTitle
