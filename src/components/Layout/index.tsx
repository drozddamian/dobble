import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import Notification from '../Notification'
import HowToPlay from '../HowToPlay'
import Logout from '../Logout'
import Footer from '../Footer'

type Props = {
  children: ReactElement
}

const Layout: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation()
  const isFooterHidden = pathname.includes('game')

  return (
    <div>
      <Notification />
      <HowToPlay />
      <Logout />

      <ContentContainer isFooterHidden={isFooterHidden}>
        {children}
      </ContentContainer>

      {!isFooterHidden && (
        <Footer />
      )}
    </div>
  )
}

const ContentContainer = styled.div<{ isFooterHidden?: boolean }>`
  height: ${({ isFooterHidden }) => isFooterHidden ? '100%' : 'calc(100% - 37px)'};
  overflow-y: scroll;
`

export default Layout