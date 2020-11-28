import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'
import { Message } from '../../types'

interface Props {
  messages: Message[];
  currentUserId: string;
}

const MessageList: React.FC<Props> = ({ messages, currentUserId }) => {

  const shouldDisplayPlayerNick = (messageIndex: number, messageSenderId: string): boolean => {
    if (messageIndex === 0) { return true }
    return messages[messageIndex - 1].sender._id !== messageSenderId
  }

  return (
    <Wrapper>
      {messages.map(({ sender, content }, index) => {
        const isOwner = sender._id === currentUserId
        const isPlayerNickVisible = !isOwner && shouldDisplayPlayerNick(index, sender._id)

        return (
          <Fragment key={`${index}_${sender._id}`}>

            {isPlayerNickVisible && (
              <PlayerNick>
                {sender.nick}
              </PlayerNick>
            )}

            <MessageContainer isOwner={isOwner}>
              {content}
            </MessageContainer>
          </Fragment>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 10px;
`

const PlayerNick = styled.p`
  padding: 0 0 5px 8px;
  font-size: ${({ theme }) => theme.fontSize.s13};
  font-family: ${({ theme }) => theme.fonts.russo};
  color: ${({ theme }) => theme.colors.inputBorder};
  align-self: flex-start;
`

const MessageContainer = styled.p<{ isOwner: boolean }>`
  align-self: flex-start;
  padding: 5px 10px;
  margin-bottom: 1px;
  border-radius: 5px;
  background-color: aliceblue;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  font-size: ${({ theme }) => theme.fontSize.smallText};
  color: ${({ theme }) => theme.colors.text};
  
  ${(props) => props.isOwner && css`
    align-self: flex-end;
    background-color: salmon;
  `};
`

export default MessageList