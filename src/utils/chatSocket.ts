import socketIOClient from 'socket.io-client'

const SOCKET_URL = `http://localhost:90`
const chatSocket: SocketIOClient.Socket = socketIOClient(SOCKET_URL)

export default chatSocket