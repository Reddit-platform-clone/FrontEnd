import io from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
  }

  // connect(url, user) 
  connect(url, emailOrUsername)
  {
    this.socket = io(url, {
      transports: ['websocket'],
      // query: { userId: user }
      query: { emailOrUsername }
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
      // console.log(user)
      console.log(emailOrUsername);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null; // Reset socket instance after disconnect
    }
  }

  getSocket() {
    return this.socket;
  }
}

// Create and export a singleton instance of SocketService
const socketServiceInstance = new SocketService();
export default socketServiceInstance;
