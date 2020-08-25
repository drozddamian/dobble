import styled from 'styled-components'

const PageWrapper = styled.div`
  padding: 24px;
  max-width: 1440px;
  margin: 0 auto;
  
  @media (min-width: ${({ theme }) => theme.rwd.tablet.minWidth}) {
    padding: 40px;
  }
`

export default PageWrapper
