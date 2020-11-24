import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useCurrentAccount } from '../../hooks'
import { useTypedSelector } from '../../redux/rootReducer'
import { fetchPlayer } from '../../redux/players'

import PageTitle from '../../components/Page/PageTitle'
import PageWrapper from '../../components/Page/Container'
import LoadingBar from '../../components/Loader/LoadingBar'



const PlayerScreen: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id: playerId } = useParams()
  const { currentUserId } = useCurrentAccount()

  const { isLoading, player } = useTypedSelector(state => state.players)

  useEffect(() => {
    if (!playerId) {
      return
    }
    dispatch(fetchPlayer(playerId))
  }, [playerId])

  if (isLoading) {
    return <LoadingBar />
  }

  if (!player) {
    return <p>error</p>
  }

  const { nick } = player

  return (
    <>
      <PageTitle title={nick} isSubPage />

      <PageWrapper>
        {playerId}
      </PageWrapper>
    </>
  )
}

export default PlayerScreen
