// lib/WebSocketSingleton.ts
let socket: WebSocket | null = null;

export function getSocket(): WebSocket {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket('ws://localhost:8080');
  }
  return socket;
}
