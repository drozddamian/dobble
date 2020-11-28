const API_SERVER_URL = 'http://localhost:5000'
/*
const API_SERVER_URL = process.env.NODE_ENV === 'development'
  ? 'https://dev-dobble.herokuapp.com/'
  : 'https://prod-dobble.herokuapp.com/'
*/

const API = {
  AUTHENTICATION: `${API_SERVER_URL}/api/authentication`,
  PLAYERS: `${API_SERVER_URL}/api/players`,
  ROOMS: `${API_SERVER_URL}/api/rooms`,
  GAME_TABLE: `${API_SERVER_URL}/api/game_table`,
  CHAT: `${API_SERVER_URL}/api/chat`,
}

const { AUTHENTICATION, PLAYERS, ROOMS, GAME_TABLE, CHAT } = API


export const API_METHODS = {
  LOGIN: `${AUTHENTICATION}/login`,
  REGISTER: `${AUTHENTICATION}/register`,
  LOGOUT: `${AUTHENTICATION}/logout`,
  PLAYERS_ROOT: `${PLAYERS}`,
  GET_TOP_PLAYERS: `${PLAYERS}/top`,
  ROOMS_ROOT: `${ROOMS}`,
  GET_MOST_POPULAR_ROOMS: `${ROOMS}/most_popular`,
  JOIN_ROOM: `${ROOMS}/join_room`,
  LEAVE_ROOM: `${ROOMS}/leave_room`,
  GAME_TABLE_ROOT: `${GAME_TABLE}`,
  CHAT_ROOT: `${CHAT}`,
}
