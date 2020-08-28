import React, { useEffect } from 'react'
import styled from 'styled-components'
import { isNil } from 'ramda'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PageWrapper from '../../components/Page/Container'
import { fetchRoomDetails } from '../../redux/room'
import PageTitle from '../../components/Page/PageTitle'
import LoadingBar from '../../components/Loader/LoadingBar'

const RoomScreen: React.FC = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const { isLoading, roomDetails } = useSelector(state => state.room)


  useEffect(() => {
    if (isNil(id)) {
      return
    }
    dispatch(fetchRoomDetails(id))
  }, [id])

  if (isLoading) {
    return (
      <LoadingBar />
    )
  }
  return (
    <PageWrapper>
      <PageTitle title={roomDetails?.name} isSubPage />

    </PageWrapper>
  )
}

const Wrapper = styled.div`

`

export default RoomScreen
