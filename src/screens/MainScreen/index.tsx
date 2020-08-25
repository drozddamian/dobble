import React, { useState } from 'react'
import styled from 'styled-components'
import PageWrapper from '../../components/Page/Container'
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
    <PageWrapper>
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
          <ChangeAuthActionButton onClick={handleChange}>
            {haveAccountButtonText}
          </ChangeAuthActionButton>
        </ChangeAuthAction>
      </AuthSection>
    </PageWrapper>
  )
}

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
  width: 100%;
`

const ChangeAuthAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
`

const Text = styled.p``

const ChangeAuthActionButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.smallText};
`


export default MainScreen
