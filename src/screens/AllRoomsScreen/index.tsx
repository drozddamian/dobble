import React, { useEffect, useRef, useCallback } from 'react'
import { debounce } from 'lodash'
import { isNil } from 'ramda'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import PageTitle from '../../components/Page/PageTitle'
import PageWrapper from '../../components/Page/Container'
import { fetchRooms } from '../../redux/room'
import { Room } from '../../api/room'


const AllRoomsScreen: React.FC = () => {
  const dispatch = useDispatch()
  const getMoreRooms = () => dispatch(fetchRooms())
  const paginatedTableRef = useRef<HTMLDivElement>(null)
  const { rooms, paginationHasMore, isLoading } = useSelector(state => state.room)

  const loadMoreRooms = debounce(() => {
    const tableContainer = paginatedTableRef.current
    if (isNil(tableContainer) || isLoading || !paginationHasMore) {
      return
    }
    if (tableContainer.scrollTop + tableContainer.clientHeight < tableContainer.scrollHeight) {
      return
    }
    getMoreRooms()
  }, 300)

  const paginateOnScroll = useCallback(loadMoreRooms, [paginationHasMore])

  useEffect(() => {
    getMoreRooms()
  }, [])

  useEffect(() => {
    const { current } = paginatedTableRef
    if (isNil(current)) {
      return
    }
    current.addEventListener('scroll', paginateOnScroll)

    return () => {
      current.removeEventListener('scroll', paginateOnScroll)
    }
  }, [paginateOnScroll])

  return (
    <>
      <PageTitle title='All rooms' isSubPage />

      <PaginatedRoomsTable ref={paginatedTableRef}>
        {rooms.map((room: Room) => (
          <>
            <Item key={room._id}>
              {room._id}
            </Item>
            <Item key={room._id}>
              {room._id}
            </Item>
            <Item key={room._id}>
              {room._id}
            </Item>
            <Item key={room._id}>
              {room._id}
            </Item>
            <Item key={room._id}>
              {room._id}
            </Item>
            <Item key={room._id}>
              {room._id}
            </Item>
            <Item key={room._id}>
              {room._id}
            </Item>
            <Item key={room._id}>
              {room._id}
            </Item>
          </>
        ))}
      </PaginatedRoomsTable>
    </>
  )
}

const Wrapper = styled(PageWrapper)`
  height: 1500px;
`

const PaginatedRoomsTable = styled.div`
  min-height: 350px;
  border: 1px solid blue;
  max-height: 500px;
  overflow: scroll;
`

const Item = styled.div`
  height: 100px;
  width: 100%;
  border: 2px solid red;
`

export default AllRoomsScreen
