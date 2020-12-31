import React from 'react'
import styled from 'styled-components'
import GithubIcon from '../../assets/icons/githubIcon.svg'

const Footer = () => (
    <Wrapper>
      <Text>
        Developed by
      </Text>

      <GithubLink href='https://github.com/drozddamian'>
        <Image src={GithubIcon} alt='Github account' />
      </GithubLink>
    </Wrapper>
)


const Wrapper = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 8px;
  background-color: ${({ theme }) => theme.colors.darkBlue08};
  
  @media (min-width: ${({ theme }) => theme.rwd.mobile.m}) {
    padding: 5px 32px;
  }
  
  @media (min-width: ${({ theme }) => theme.rwd.tablet.s}) {
    padding: 5px 64px;
  }
  
  @media (min-width: ${({ theme }) => theme.rwd.desktop.xs}) {
    padding: 5px 128px;
  }
`

const Text = styled.p`
  color: ${({ theme }) => theme.colors.white08};
`

const GithubLink = styled.a``

const Image = styled.img`
  width: 24px;
  margin-left: 16px;
`

export default React.memo(Footer)