import React, { ReactElement } from 'react'
import styled from 'styled-components'
import Notification from '../Notification'
import HowToPlay from '../HowToPlay'
import Logout from '../Logout'
import Footer from '../Footer'

type Props = {
  children: ReactElement
}

const Layout: React.FC<Props> = ({ children }) => (
  <div>
    <Notification />
    <HowToPlay />
    <Logout />

    <ContentContainer>
      {children}
    </ContentContainer>

    <Footer />
  </div>
)

const ContentContainer = styled.div`
  height: calc(100% - 37px);
  overflow-y: scroll;
`

export default Layout