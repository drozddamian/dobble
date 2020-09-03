import React, { useState } from 'react'
import styled from 'styled-components'
import SwingText from '../../components/SwingText'
import { SectionTitle } from './index'
import RegisterForm from '../../components/Forms/Register'
import LoginForm from '../../components/Forms/Login'

enum AuthType {
  REGISTER = 'register',
  LOGIN = 'login',
}

const { REGISTER, LOGIN } = AuthType

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


const AuthSection: React.FC = () => {
  const [currentAuthAction, setCurrentAuthAction] = useState<AuthType>(LOGIN)

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
      <SectionTitle>
          Sign{' '}
        <SwingText text={titlePostfix} />
      </SectionTitle>

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
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 360px;
  width: 100%;
  
  @media (min-width: ${({ theme }) => theme.rwd.desktop.xs}) {
    margin-right: 100px;
  }
  
  @media (min-width: ${({ theme }) => theme.rwd.desktop.m}) {
    margin-right: 140px;
  }
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

export default AuthSection
