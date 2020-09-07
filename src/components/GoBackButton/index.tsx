import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const GoBackButton: React.FC = () => {
  const history = useHistory()

  const handleGoBackClick = () => history.goBack()

  return (
    <Button onClick={handleGoBackClick}>
      <Shape />
    </Button>
  )
}

const Shape = styled.div`
  width: 16px;
  height: 16px;
  border-left: 5px solid ${({ theme }) => theme.colors.darkBlue};
  border-top: 5px solid ${({ theme }) => theme.colors.darkBlue};
  transform: rotate(-45deg);
`

export const Button = styled.button`
  padding: 5px;
  
  :hover {
    ${Shape} {
      border-color: ${({ theme }) => theme.colors.pink};  
    }
  }
`

export default GoBackButton
