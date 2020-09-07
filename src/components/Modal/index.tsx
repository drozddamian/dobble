import React, { ReactElement } from 'react'
import styled from 'styled-components'
import Button from '../Button'
import theme from '../../utils/theme'

interface Props {
  isModalVisible: boolean;
  text?: string;
  acceptButtonText?: string;
  declineButtonText?: string;
  acceptButtonFunction?: () => void;
  declineButtonFunction?: () => void;
  children?: ReactElement;
}

// eslint-disable-next-line react/display-name
const Modal = React.forwardRef<
  HTMLDivElement,
  Props
>((props, forwardedRef) => {
  // eslint-disable-next-line react/prop-types
  const { isModalVisible, text, acceptButtonText, acceptButtonFunction, declineButtonText, declineButtonFunction, children } = props

  if (!isModalVisible) {
    return null
  }
  return (
    <Wrapper>
      <ContentContainer ref={forwardedRef}>
        {children || (
          <ModalText>
            {text}
          </ModalText>
        )}

        {acceptButtonText && (
          <ButtonContainer>
            <Button
              text={acceptButtonText}
              type='button'
              handleClick={acceptButtonFunction}
              isSmallButton
            />

            {declineButtonText && (
              <DeclineButtonContainer>
                <Button
                  text={declineButtonText}
                  type='button'
                  handleClick={declineButtonFunction}
                  isSmallButton
                  background={theme.colors.inputBorder}
                />
              </DeclineButtonContainer>
            )}
          </ButtonContainer>
        )}
      </ContentContainer>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: ${({ theme }) => theme.colors.darkBlue08};
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 280px;
  max-width: 380px;
  min-height: 220px;
  border-radius: 8px;
  padding: 40px 0 25px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.inputShadow};
`

const ModalText = styled.p`
  padding: 0 24px;

  @media (min-width: ${({ theme }) => theme.rwd.tablet.s}) {
    padding: 0 40px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
`

const DeclineButtonContainer = styled.div`
  margin-left: 24px;
  
  @media (min-width: ${({ theme }) => theme.rwd.tablet.s}) {
    margin-left: 32px;
  }
`

export default Modal
