import React, { ReactElement, useRef } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Modal from '../Modal'
import LogoutIcon from '../../assets/icons/logout.svg'
import { logoutAccount } from '../../redux/authentication'
import { useCurrentAccount, useModal } from '../../hooks'


const LOGOUT_TEXT = 'Are you sure you want to log out?'

const Logout = (): ReactElement | null => {
  const dispatch = useDispatch()
  const modalRef = useRef(null)
  const { isModalVisible, handleOpenModal, handleCloseModal } = useModal(modalRef)

  const { currentUserId } = useCurrentAccount()

  const handleLogoutClick = () => {
    dispatch(logoutAccount())
  }

  if (!currentUserId) {
    return null
  }
  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        text={LOGOUT_TEXT}
        acceptButtonText='Log out'
        acceptButtonFunction={handleLogoutClick}
        declineButtonText='Cancel'
        declineButtonFunction={handleCloseModal}
      />

      <Wrapper onClick={handleOpenModal}>
        <Icon src={LogoutIcon} alt='Logout' />

        <Text>
          Logout
        </Text>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.button`
  position: fixed;
  top: 8px;
  right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white08};
  border: 1px solid ${({ theme }) => theme.colors.darkBlue};
  padding: 6px 3px;
  
  @media (min-width: ${({ theme }) => theme.rwd.mobile.s}) {
    top: 15px;
    right: 15px;
    padding: 6px 10px;
  }
`

const Text = styled.p`
  font-family: ${({ theme }) => theme.fonts.russo};
  color: ${({ theme }) => theme.colors.darkBlue};
  display: none;
  
  @media (min-width: ${({ theme }) => theme.rwd.mobile.s}) {
    display: inline;
  }
`

const Icon = styled.img`
  height: 16px;
  margin-right: 8px;
`


export default Logout
