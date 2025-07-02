export function guestUsernameGenerator():string{

  const randomFirstName = Math.floor(Math.random()*10);
  const randomSecondName = Math.floor(Math.random()*10);

  const RandomUserName = firstnames[randomFirstName] + "-"+ secondNames[randomSecondName] + "-" + Math.floor(Math.random()*100)

  return RandomUserName;
}

export function getGuestExpires() {
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
  return expires.toISOString(); // or return the Date object, depending on your need
}

const firstnames = [
  "Snow",
  "Hot",
  "Cool",
  "Smart",
  "Snow",
  "Hot",
  "Cool",
  "Smart",
  "Cool",
  "Smart"
]
const secondNames = [
  "Cat",
  "Dog",
  "Snake",
  "Lion",
  "Cheetah",
  "Cat",
  "Dog",
  "Snake",
  "Lion",
  "Cheetah"
]
