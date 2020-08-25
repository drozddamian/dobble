import React, { useState } from 'react'
import styled from 'styled-components'
import LoginForm from '../../components/Forms/Login'
import RegisterForm from '../../components/Forms/Register'
import SwingText from '../../components/SwingText'

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
      haveAccountText: 'Already have an account?',
      haveAccountButtonText: 'Log in',
    },
    [LOGIN]: {
      titlePostfix: 'in',
      formComponent: <LoginForm />,
      haveAccountText: "Don't have an account?",
      haveAccountButtonText: 'Register',
    },
  }

  const {
    titlePostfix,
    formComponent,
    haveAccountText,
    haveAccountButtonText,
  } = AuthSectionData[currentAuthAction]

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
          Sign{' '}
          <SwingText text={titlePostfix} />
        </OperationTitle>

        <FormContainer>
          {formComponent}
        </FormContainer>

        <ChangeAuthAction>
          <Text>
            {haveAccountText}
          </Text>
          <button onClick={handleChange}>
            {haveAccountButtonText}
          </button>
        </ChangeAuthAction>

      </AuthSection>
    </Wrapper>
  )
}

const Wrapper = styled.div`

`

const AuthSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const OperationTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.russo};
  color: ${({ theme }) => theme.colors.darkBlue};
  padding-bottom: 40px;
  width: 100px;
  display: flex;
`

const FormContainer = styled.div`

`

const ChangeAuthAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Text = styled.p``

export default MainScreen
