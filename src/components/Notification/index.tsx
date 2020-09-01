import React from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import { useNotification } from '../../hooks/useNotification'
import { NOTIFICATION_DATA } from './constant-data'


interface WrapperProps {
  shadowColor: string;
}

const Notification: React.FC = () => {
  const {
    isNotificationVisible,
    notificationText,
    notificationType,
  } = useNotification()

  const styleProps = useSpring({ opacity: isNotificationVisible ? 1 : 0 })

  if (!isNotificationVisible) {
    return null
  }

  const { shadowColor, icon } = NOTIFICATION_DATA[notificationType ?? 0]

  return (
    <Wrapper shadowColor={shadowColor} style={styleProps}>
      <NotificationText>
        {notificationText}
      </NotificationText>

      <IconContainer>
        <Icon src={icon} alt='Notification' />
      </IconContainer>
    </Wrapper>
  )
}

const Wrapper = styled(animated.div)`
  position: fixed;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  z-index: 500;
  padding: 12px 16px;
  min-width: 220px;
  border-radius: 8px;
  box-shadow: 0 0 4px 0 ${(props: WrapperProps) => props.shadowColor};
  background-color: ${({ theme }) => theme.colors.white};
`

const NotificationText = styled.span`
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  font-size: ${({ theme }) => theme.fontSize.smallText};
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
`

const Icon = styled.img`
  height: 16px;
`

export default Notification
