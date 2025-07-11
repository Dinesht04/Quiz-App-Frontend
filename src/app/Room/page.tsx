import { redirect } from 'next/navigation';

// To Do
// Room create/join , lobby and game Component.
// Lobby separate for host and user
// Host Logic,
// Game Data-Flow
//   Checking Answers, recording game data

// Need a way to store and send to backend if the user is host or not

export default async function () {
  redirect('/');

  return <div>{/* <RoomAuthGate session={session} /> */}</div>;
}
