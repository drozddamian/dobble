enum API {
  AUTH = '/api/auth',
  PLAYER = '/api/player',
  ROOM = '/api/room',
}

const { AUTH, PLAYER, ROOM } = API


export const API_METHODS = {
  LOGIN: `${AUTH}/login`,
  REGISTER: `${AUTH}/register`,
  GET_PLAYER: `${PLAYER}/:username`,
  MODIFY_PLAYER: `${PLAYER}/change_data`,
  GET_ROOMS: `${ROOM}/list_rooms`,
  GET_ROOM: `${ROOM}/:roomId`,
  CREATE_ROOM: `${ROOM}/create_room`,
  DELETE_ROOM: `${ROOM}/:roomId`,
}
