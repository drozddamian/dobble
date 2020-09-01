import React from 'react'
import styled from 'styled-components'

interface Props {
  isModalVisible: boolean;
  text: string;
  acceptButtonText: string;
  declineButtonText?: string;
  acceptButtonFunction: () => void;
  declineButtonFunction?: () => void;
}

// eslint-disable-next-line react/display-name
const Modal = React.forwardRef<
  HTMLDivElement,
  Props
>((props, forwardedRef) => {
  // eslint-disable-next-line react/prop-types
  const { isModalVisible, text, acceptButtonText, acceptButtonFunction } = props

  if (!isModalVisible) {
    return null
  }
  return (
    <Wrapper>
      <ContentContainer ref={forwardedRef}>
        <ModalText>
          {text}
        </ModalText>
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
  background-color: ${({ theme }) => theme.colors.darkBlue08};
`

const ContentContainer = styled.div`
  min-width: 280px;
  min-height: 300px;
  padding: 16px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
`

const ModalText = styled.p``

export default Modal
