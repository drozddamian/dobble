import React, { ReactElement, useRef } from 'react'
import styled from 'styled-components'
import Modal from '../Modal'
import QuestionMarkIcon from '../../assets/icons/question.svg'
import { useModal } from '../../hooks'


const HowToPlay = (): ReactElement | null => {
  const modalRef = useRef(null)
  const { isModalVisible, handleOpenModal, handleCloseModal } = useModal(modalRef)

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        acceptButtonText='Got it!'
        acceptButtonFunction={handleCloseModal}
      >
        <HowToContainer>
          <Title>
            How to play
          </Title>

          <GameRulesList>
            <GameRuleText>Look for the same symbol in both cards</GameRuleText>
            <GameRuleText>Got it? Spot it! Click the symbol on your card</GameRuleText>
            <GameRuleText>Repeat previous steps until you spot it all and win the game!</GameRuleText>
          </GameRulesList>
        </HowToContainer>
      </Modal>

      <Wrapper onClick={handleOpenModal}>
        <Icon src={QuestionMarkIcon} alt='Help' />
      </Wrapper>
    </>
  )
}

const Wrapper = styled.button`
  position: fixed;
  top: 15px;
  right: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.darkBlue};
  border-radius: 5px;
  padding: 6px 6px;
`

const Icon = styled.img`
  height: 16px;
`

const HowToContainer = styled.div`
  padding: 0 16px;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.russo};
  font-size: ${({ theme }) => theme.fontSize.s14};
  color: ${({ theme }) => theme.colors.darkBlue};
`

const GameRulesList = styled.ol`
  margin: 0;
  padding: 20px 0 40px 1em;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
`

const GameRuleText = styled.li`
  line-height: 1.4;
`

export default HowToPlay
