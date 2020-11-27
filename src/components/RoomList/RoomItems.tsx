import React from 'react'
import { equals } from 'ramda'
import styled from 'styled-components'
import { Room } from '../../api/rooms'
import crown from '../../assets/icons/crown.svg'
import { useCurrentAccount, useWindowSize } from '../../hooks'

interface Props {
  rooms: Room[];
}

const RoomItems: React.FC<Props> = (props: Props) => {
  const { rooms } = props
  const { currentUserId } = useCurrentAccount()
  const { width } = useWindowSize()
  const isMobile = width < 740

  return (
    <>
      {rooms.map((room) => {
        const { _id, owner, name, howManyPlayers, availableSeats } = room
        const { _id: ownerId } = owner

        const isOwner = equals(ownerId, currentUserId)
        const roomURL = `/room/${_id}`

        return (
          <ItemWrapper href={roomURL} key={_id}>
            <RoomInfoCell>
              <ItemTitle>
                {name}
              </ItemTitle>

              {isOwner && (
                <OwnerContainer>
                  <OwnerIcon src={crown} alt='owner' />

                  <OwnerText>
                    Owner
                  </OwnerText>
                </OwnerContainer>
              )}
            </RoomInfoCell>

            <RoomPlayersInfoCell>
              {isMobile
                ? (
                  <PlayerInfoText>
                    {howManyPlayers}/{availableSeats}
                  </PlayerInfoText>
                )
                : (
                  <>
                    <PlayerInfoText>
                      Players in room:
                      <NumberInfo>{howManyPlayers}</NumberInfo>
                    </PlayerInfoText>

                    <PlayerInfoText>
                      Available seats:
                      <NumberInfo>{availableSeats}</NumberInfo>
                    </PlayerInfoText>
                  </>
                )}
            </RoomPlayersInfoCell>
          </ItemWrapper>
        )
      })}
    </>
  )
}

export const ItemTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.russo};
  font-size: ${({ theme }) => theme.fontSize.s13};
  max-width: 210px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: ${({ theme }) => theme.rwd.mobile.s}) {
    max-width: 320px;
    font-size: ${({ theme }) => theme.fontSize.smallText};
  }
`

export const ItemWrapper = styled.a`
  display: flex;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: linear-gradient(to right, white 90%, rgba(0,116,217,0.2) 100%);
  box-shadow: 0 7px 30px -10px rgba(150,170,180,0.5);

  :first-of-type {
    border-top-right-radius: 5px;
  }
  :last-of-type {
    border-bottom-right-radius: 5px;
  }

  :after {
    position: absolute;
    content: '';
    height: 100%;
    top: 0;
    right: 0;
    background-color: rgba(0,116,217,0.05);
    width: 100%;
    transform: translateX(100%);
    transition: transform .2s ease-in-out;
  }

  :hover{
    ${ItemTitle} {
      color: ${({ theme }) => theme.colors.pink};
    }

    :after {
      transform: translateX(80%);
    }
  }
`

const RoomInfoCell = styled.div`
  display: flex;
  align-items: center;
`

const RoomPlayersInfoCell = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: 740px) {
    min-width: 140px;
  }
`

const PlayerInfoText = styled.p`
  font-family: ${({ theme }) => theme.fonts.robotoBold};
  font-size: ${({ theme }) => theme.fontSize.smallText};
  display: flex;
`

const NumberInfo = styled.span`
  margin-left: auto;
`

const OwnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 8px;

  @media (min-width: ${({ theme }) => theme.rwd.mobile.s}) {
    margin-left: 16px;
  }
`

const OwnerText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.s13};
  color: ${({ theme }) => theme.colors.darkBlue};
`

const OwnerIcon = styled.img`
  height: 18px;
`


export default RoomItems
