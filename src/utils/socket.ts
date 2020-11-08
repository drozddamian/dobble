import socketIOClient from 'socket.io-client'

const SOCKET_URL = `http://localhost:80`
const socket: SocketIOClient.Socket = socketIOClient(SOCKET_URL)

export default socket