import React, { useEffect } from 'react'
import styled from 'styled-components'
import { isNil } from 'ramda'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from "../../../redux/rootReducer";
import { fetchPlayer } from '../../../redux/players'
import LoadingComponent from '../../../components/Loader/CircleLoader'
import theme from '../../../utils/theme'
import RoomsSection from './RoomsSection'
import PlayerBadge from "../../../components/PlayerBadge";

interface Props {
  userId: string;
}

const PlayerSection: React.FC<Props> = ({ userId } ) => {
  const dispatch = useDispatch()

  const { player, isLoading } = useTypedSelector(state => state.players)
  const { rooms } = useTypedSelector(state => state.rooms)

  useEffect(() => {
    dispatch(fetchPlayer(userId))
  }, [rooms])

  if (isLoading || isNil(player)) {
    return <LoadingComponent color={theme.colors.white} />
  }

  return (
    <Wrapper>
      <PlayerBadge />

      <RoomsSection
        isLoading={isLoading}
        joinedRooms={player.joinedRooms}
        owningRooms={player.owningRooms}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
`

export default PlayerSection
