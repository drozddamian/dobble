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
          Sign {titlePostfix}
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

`

const OperationTitle = styled.h2`
  font-family: 'RobotoBold';
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
