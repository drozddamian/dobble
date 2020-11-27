import React, { useEffect, useRef, useCallback } from 'react'
import { debounce } from 'lodash'
import { isNil } from 'ramda'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from "../../redux/rootReducer";
import { fetchRooms } from '../../redux/rooms'
import PageTitle from '../../components/Page/PageTitle'
import PageWrapper from '../../components/Page/Container'
import LoadingComponent from '../../components/Loader/CircleLoader'
import RoomItems from '../../components/RoomList/RoomItems'
import theme from '../../utils/theme'


const AllRoomsScreen: React.FC = () => {
  const dispatch = useDispatch()
  const getMoreRooms = () => dispatch(fetchRooms())
  const paginatedTableRef = useRef<HTMLDivElement>(null)
  const { rooms, paginationHasMore, isLoading } = useTypedSelector(state => state.rooms)

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
    <PageWrapper>
      <PageTitle title='All rooms' isSubPage />

      <AllRoomsContainer>
        <PaginatedRoomsTable ref={paginatedTableRef}>
          <RoomItems rooms={rooms} />

          {isLoading && (
            <LoadingContainer>
              <LoadingComponent color={theme.colors.white}/>
            </LoadingContainer>
          )}
        </PaginatedRoomsTable>
      </AllRoomsContainer>
    </PageWrapper>
  )
}



const AllRoomsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 60px;
`

const PaginatedRoomsTable = styled.div`
  width: 100%;
  min-height: 350px;
  max-height: 500px;
  overflow-y: scroll;
  box-shadow: 0 7px 30px -10px rgba(150,170,180,0.3);
  
  ::-webkit-scrollbar {
    width: 8px;
  }
 
  ::-webkit-scrollbar-track {
    box-shadow: ${({ theme }) => theme.shadows.scrollBarShadow};
  }
 
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.softPink};
    border-radius: 5px;
  }
  
  @media (min-width: ${({ theme }) => theme.rwd.tablet.s}) {
    max-width: 700px;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
`

export default AllRoomsScreen
