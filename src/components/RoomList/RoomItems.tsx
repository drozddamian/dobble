import React from 'react'
import styled from 'styled-components'
import { Room } from '../../api/room'
import crown from '../../assets/icons/crown.svg'

interface Props {
  rooms: Room[];
}

const RoomItems: React.FC<Props> = (props: Props) => {
  const { rooms } = props

  return (
    <>
      {rooms.map((room) => {
        const { _id, owner, name, howManyPlayers, availableSeats } = room
        const isOwner = true

        return (
          <ItemWrapper key={_id}>
            <RoomInfoCell>
              <RoomTitle>
                {name}
              </RoomTitle>

              {isOwner && (
                <OwnerContainer>
                  <OwnerIcon src={crown} alt='owner' />

                  <OwnerText>
                    Owner
                  </OwnerText>
                </OwnerContainer>
              )}
            </RoomInfoCell>

            <RoomInfoCell>
              <Text>
                {howManyPlayers}/
              </Text>

              <Text>
                {availableSeats}
              </Text>
            </RoomInfoCell>
          </ItemWrapper>
        )
      })}
    </>
  )
}

const RoomTitle = styled.span`
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

const ItemWrapper = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  justify-content: space-between;
  align-items: center;
  padding: 16px 12px;
  background: linear-gradient(to right, white 35%, rgba(0,116,217,0.2) 100%);
  
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
    transition: transform .3s ease-in-out;
  }
  
  :hover{
    ${RoomTitle} {
      color: ${({ theme }) => theme.colors.pink};
    }
    
    :after {
      transform: translateX(0);
    }
  }
`

const RoomInfoCell = styled.div`
  display: flex;
  align-items: center;
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

const Text = styled.p`
  font-family: ${({ theme }) => theme.fonts.robotoBold};
`


export default RoomItems
