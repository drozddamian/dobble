import React from 'react'
import styled from 'styled-components'

interface Props {
  nick: string;
  isRoomOwner?: boolean;
}

const PlayerListItem: React.FC<Props> = ({ nick, isRoomOwner }) => (
  <Wrapper>
    <PlayerNameContainer>
      <Nick>
        {nick}
      </Nick>

      {isRoomOwner && (
        <RoomOwnerText>
          room owner
        </RoomOwnerText>
      )}
    </PlayerNameContainer>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.russo};
`

const Nick = styled.p`
  font-size: ${({ theme }) => theme.fontSize.s12};
  font-family: ${({ theme }) => theme.fonts.russo};
`

const PlayerNameContainer = styled.div`
  display: flex;
  align-items: center;
`

const RoomOwnerText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.s12};
  color: ${({ theme }) => theme.colors.gold};
  text-transform: uppercase;
  text-align: center;
  max-width: 50px;
  margin-left: 12px;
`

export default PlayerListItem
