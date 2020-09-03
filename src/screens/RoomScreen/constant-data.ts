import { deleteRoom, addPlayerToRoom, leaveRoom } from '../../redux/room'

export enum USER_STATUS { OWNER, JOIN, LEAVE }
const { OWNER, JOIN, LEAVE } = USER_STATUS

export const BUTTON_ACTION_DATA = {
  [OWNER]: {
    buttonText: 'Delete room',
    modalText: 'Are you sure you want to delete the room?',
    acceptModalText: 'Delete',
    action: deleteRoom,
  },
  [JOIN]: {
    buttonText: 'Join room',
    modalText: 'Are you sure you want to join the room?',
    acceptModalText: 'Join now',
    action: addPlayerToRoom,
  },
  [LEAVE]: {
    buttonText: 'Leave room',
    modalText: 'You are leaving the room',
    acceptModalText: 'Leave now',
    action: leaveRoom,
  },
}
