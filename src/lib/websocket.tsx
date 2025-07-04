// lib/WebSocketSingleton.ts
let socket: WebSocket | null = null;

export function getSocket(): WebSocket {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket('ws://localhost:8080');
  }
  return socket;
}

export function TypeChecker(type:string,status?:string):string{
  if(type === "join"){
    return "join"
  } else if (type === "client-list"){
    return "client-list"
  } else if (type === "questions"){
    return "questions"
  } else if (type === "unauthorised"){
    return "unauthorized"
  } else if (type === "leave" && status === "successful"){
    return "leave"
  } else if (type === "answer"){
    return "answer"
  } else if (type === "score"){
    return "score"
  } else if(type === "message"){
    return "message"
  } else {
    return "Unknown"
  }

}
