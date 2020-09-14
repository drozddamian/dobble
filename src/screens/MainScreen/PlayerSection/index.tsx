import React, { useEffect } from 'react'
import styled from 'styled-components'
import { isNil } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlayer } from '../../../redux/players'
import LoadingComponent from '../../../components/Loader/CircleLoader'
import theme from '../../../utils/theme'
import RoomsSection from './RoomsSection'
import PlayerBadge from "../../../components/PlayerBadge";


interface Props {
  userId: string;
}

const PlayerSection: React.FC<Props> = (props: Props) => {
  const { userId } = props
  const dispatch = useDispatch()

  const { player, isLoading } = useSelector(state => state.players)
  const { rooms } = useSelector(state => state.rooms)

  useEffect(() => {
    dispatch(fetchPlayer(userId))
  }, [rooms])

  if (isLoading || isNil(player)) {
    return <LoadingComponent color={theme.colors.white} />
  }

  const { joinedRooms, owningRooms } = player

  return (
    <Wrapper>
      <PlayerBadge player={player} />

      <RoomsSection
        isLoading={isLoading}
        joinedRooms={joinedRooms}
        owningRooms={owningRooms}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
`

export default PlayerSection
