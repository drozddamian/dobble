import socketIOClient from 'socket.io-client'
import { API_SERVER_URL } from '../constants/api'

const gameSocket: SocketIOClient.Socket = socketIOClient(API_SERVER_URL, { transports: ['websocket'] })

export default gameSocket