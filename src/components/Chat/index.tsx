import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { equals, isEmpty, isNil } from 'ramda'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../redux/rootReducer'
import { fetchMessages, addNewMessage } from '../../redux/chat'
import { useCurrentAccount } from '../../hooks'

import chatSocket from '../../utils/chatSocket'
import CHAT_SOCKET_ACTIONS from '../../constants/chatSocket'
import { Message } from '../../types'

import SectionTitle from '../UI/SectionTitle'
import Input, { InputProps } from '../Forms/Input'
import NoItemsFound, { Wrapper as NoItemsFoundContainer } from '../UI/NoItemsFound'
import LoadingBar, { Wrapper as LoadingContainer } from '../Loader/LoadingBar'
import MessageList from './MessageList'
import usePrevious from '../../hooks/usePrevious'
import messageSound from '../../assets/sounds/message.mp3'

const { NEW_MESSAGE } = CHAT_SOCKET_ACTIONS

const Chat = () => {
  const notificationTune = new Audio(messageSound)
  const dispatch = useDispatch()
  const sectionList = useRef(null)
  const { currentUserId } = useCurrentAccount()
  const { messages, paginationHasMore, currentPaginationChunk, isLoading } = useTypedSelector(state => state.chat)

  const [messageText, setMessageText] = useState('')

  useEffect(() => {
    notificationTune.load()
    dispatch(fetchMessages(currentPaginationChunk))

    return () => {
      if (chatSocket) {
        chatSocket.disconnect();
      }
    }
  }, [dispatch, currentPaginationChunk, notificationTune])

  useEffect(() => {
    if (!isLoading && !chatSocket.connected) {
      chatSocket.connect()
    }
  }, [isLoading])

  useEffect(() => {
    chatSocket.on(NEW_MESSAGE, async (newMessage: Message) => {
      dispatch(addNewMessage(newMessage))

      const { sender } = newMessage
      if (!equals(sender._id, currentUserId)) {
        await notificationTune.play()
      }
    })
  }, [dispatch, currentUserId, notificationTune])

  const previousPaginationChunk = usePrevious(currentPaginationChunk)
  const previousMessagesLength = usePrevious(messages.length)
  useEffect(() => {
    if (!sectionList?.current) { return }

    if (
      previousPaginationChunk !== 1 &&
      previousPaginationChunk !== currentPaginationChunk
    ) {
      const howManyNewMessagesFetched = messages.length - previousMessagesLength
      // @ts-ignore
      sectionList.current.scrollTop = howManyNewMessagesFetched * 29
      return
    }

    if (!isEmpty(messages) && sectionList?.current) {
      // @ts-ignore
      sectionList.current.scrollTop = sectionList.current.scrollHeight
    }
  }, [messages, currentPaginationChunk, previousMessagesLength, previousPaginationChunk])

  const handleScroll = () => {
    if (!paginationHasMore || isNil(sectionList.current)) { return }
    // @ts-ignore
    if (sectionList.current.scrollTop === 0) {
      dispatch(fetchMessages(currentPaginationChunk))
    }
  };

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isEmpty(messageText)) {
      chatSocket.emit(NEW_MESSAGE, {
        sender: currentUserId,
        content: messageText,
      })

      setMessageText('')
    }
  }

  const handleMessageInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setMessageText(value)
  }

  const inputProps: InputProps = {
    type: "text",
    value: messageText,
    onChange: handleMessageInputChange,
  }


  const renderMessageList = () => {
    if (!currentUserId) {
      return <NoItemsFound text='Chat is available only for logged in users' />
    }
    if (!isEmpty(messages)) {
      return <MessageList messages={messages} currentUserId={currentUserId} />
    }
    return isLoading
      ? <LoadingBar />
      : <NoItemsFound text='Room list is empty' />
  }

  return (
    <Wrapper>
      <SectionTitle>
        Chat
      </SectionTitle>

      <ChatContainer>
        <MessagesContainer ref={sectionList} onScroll={handleScroll}>
          {renderMessageList()}
        </MessagesContainer>

        {currentUserId && (
          <MessageForm onSubmit={handleSendMessage}>
            <Input inputName='message' inputProps={inputProps} />

            <SendButton type='submit'>
              send
            </SendButton>
          </MessageForm>
        )}
      </ChatContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 80px;
`

const ChatContainer = styled.div`
  margin-top: 16px;
  box-shadow: 0 7px 30px -10px rgba(150,170,180,0.5);
`

const MessagesContainer = styled.div`
  margin-bottom: 4px;
  padding-top: 4px;
  width: 100%;
  min-height: 250px;
  max-height: 250px;
  overflow: hidden;
  overflow-y: scroll;
  position: relative;
  
  ${NoItemsFoundContainer} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
  }
  
  ${LoadingContainer} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
`

const MessageForm = styled.form`
  position: relative;
`

const SendButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 5px;
  z-index: 10;
  padding: 6px 4px;
  border-radius: 3px;
  font-family: ${({ theme }) => theme.fonts.russo};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.darkBlue};
  transition: background-color .2s ease-in-out;
  
  :hover {
    background-color: ${({ theme }) => theme.colors.darkBlue08};
  }
`

export default Chat