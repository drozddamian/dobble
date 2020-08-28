import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import PageWrapper from '../../components/Page/Container'
import LoginForm from '../../components/Forms/Login'
import RegisterForm from '../../components/Forms/Register'
import SwingText from '../../components/SwingText'
import RoomList from '../../components/RoomList'
import { fetchPopularRooms } from '../../redux/room'


enum AuthType {
  REGISTER = 'register',
  LOGIN = 'login',
}

const { REGISTER, LOGIN } = AuthType

const MainScreen: React.FC = () => {
  const dispatch = useDispatch()

  const [currentAuthAction, setCurrentAuthAction] = useState<AuthType>(LOGIN)
  const { isLoading, mostPopularRooms } = useSelector(state => state.room)

  useEffect(() => {
    dispatch(fetchPopularRooms())
  }, [])

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
    <MainPageWrapper>
      <AuthSection>
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
      </AuthSection>

      <RoomsSection>
        <RoomSectionTitle>
          Most popular rooms
        </RoomSectionTitle>

        <RoomList
          rooms={mostPopularRooms}
          isLoading={isLoading}
        />
      </RoomsSection>
    </MainPageWrapper>
  )
}

const MainPageWrapper = styled(PageWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: ${({ theme }) => theme.rwd.desktop.xs}) {
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
  }
`

const AuthSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 360px;
  width: 100%;
  
  @media (min-width: ${({ theme }) => theme.rwd.desktop.xs}) {
    padding-right: 100px;
  }
  
  @media (min-width: ${({ theme }) => theme.rwd.desktop.m}) {
    padding-right: 140px;
  }
`

const RoomsSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  width: 100%;
  max-width: 650px;
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.russo};
  font-size: ${({ theme }) => theme.fonts.smallTitle};
  color: ${({ theme }) => theme.colors.darkBlue};
  padding-bottom: 40px;
  width: 100px;
  display: flex;
  
  @media (min-width: ${({ theme }) => theme.rwd.desktop.xs}) {
    align-self: flex-start;
  }
`

const RoomSectionTitle = styled(SectionTitle)`
  width: 100%;
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
