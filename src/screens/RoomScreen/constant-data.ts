export enum USER_STATUS { OWNER, JOIN, LEAVE }
const { OWNER, JOIN, LEAVE } = USER_STATUS

export const BUTTON_ACTION_DATA = {
  [OWNER]: {
    buttonText: 'Remove room',
    action: 'remove room',
  },
  [JOIN]: {
    buttonText: 'Join room',
    action: 'join',
  },
  [LEAVE]: {
    buttonText: 'Leave room',
    action: 'leave',
  },
}
