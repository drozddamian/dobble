import socketIOClient from 'socket.io-client'
import { API_SERVER_URL } from '../constants/api'

const chatSocket: SocketIOClient.Socket = socketIOClient(API_SERVER_URL, { transports: ['websocket'] })

export default chatSocket