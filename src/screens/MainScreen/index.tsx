import React, { useState } from 'react'
import styled from 'styled-components'
import LoginForm from '../../components/Forms/Login'
import RegisterForm from '../../components/Forms/Register'

enum AuthType {
  REGISTER = 'register',
  LOGIN = 'login',
}

const { REGISTER, LOGIN } = AuthType

const MainScreen: React.FC = () => {
  const [currentAuthAction, setCurrentAuthAction] = useState<AuthType>(LOGIN)

  const AuthSectionData = {
    [REGISTER]: {
      titlePostfix: 'up',
      formComponent: <RegisterForm />,
    },
    [LOGIN]: {
      titlePostfix: 'in',
      formComponent: <LoginForm />,
    },
  }

  const { titlePostfix, formComponent } = AuthSectionData[currentAuthAction]

  const handleChange = () => {
    if (currentAuthAction === LOGIN) {
      setCurrentAuthAction(REGISTER)
    } else {
      setCurrentAuthAction(LOGIN)
    }
  }

  return (
    <Wrapper>
      <AuthSection>
        <OperationTitle>
          Sign {titlePostfix}
        </OperationTitle>

        <FormContainer>
          {formComponent}
        </FormContainer>

        <button onClick={handleChange}>
          change
        </button>

      </AuthSection>
    </Wrapper>
  )
}

const Wrapper = styled.div`

`

const AuthSection = styled.div`

`

const OperationTitle = styled.h2`

`

const FormContainer = styled.div`

`

export default MainScreen
