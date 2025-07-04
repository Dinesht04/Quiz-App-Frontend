export function guestUsernameGenerator(): string {
  const randomFirstName = Math.floor(Math.random() * 10);
  const randomSecondName = Math.floor(Math.random() * 10);

  const RandomUserName =
    firstnames[randomFirstName] +
    '-' +
    secondNames[randomSecondName] +
    '-' +
    Math.floor(Math.random() * 100);

  return RandomUserName;
}

export function getGuestExpires() {
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
  return expires.toISOString(); // or return the Date object, depending on your need
}

const firstnames = [
  'Sparkle',
  'Wiggle',
  'Giggle',
  'Pipsqueak',
  'Captain',
  'Professor',
  'Doctor',
  'Ziggy',
  'Whiz',
  'Snuggle',
  'Bumble',
  'Zippy',
  'Doodle',
  'Jelly',
  'Quasar',
  'Fuzzy',
  'Turbo',
  'Pixel',
  'Biscuit',
  'Noodle',
  'Blaze',
  'Echo',
  'Fluffy',
  'Gizmo',
  'Grumpy',
  'Happy',
  'Jumpy',
  'Lucky',
  'Misty',
  'Pudding',
  "Ramblin'",
  'Sassy',
  'Skipper',
  'Sparky',
  'Sunny',
  'Twinkle',
  'Wacky',
  'Zany',
  'Buttercup',
  'Cupcake',
  'Marshmallow',
  'Pebble',
  'Rainbow',
  'Snickerdoodle',
  'Sprinkle',
  'Waffle',
  'Whiskers',
  'Zoom',
  'Comet',
];

const secondNames = [
  'Paws',
  'Whiskers',
  'Snout',
  'Scales',
  'Fins',
  'Wings',
  'Boots',
  'Socks',
  'Noodles',
  'Sprinkles',
  'Toes',
  'Pants',
  'Buttons',
  'Gizmo',
  'Gadget',
  'Blinky',
  'Wobble',
  'Zoomer',
  'Gloop',
  'Squiggle',
  'Frizzle',
  'Glimmer',
  'Bumble',
  'Fizz',
  'Jinx',
  'Kook',
  'Muffin',
  'Nugget',
  'Pickle',
  'Poof',
  'Rumble',
  'Shuffle',
  'Splat',
  'Squish',
  'Tickle',
  'Tangle',
  'Wigglebutt',
  'Zizzle',
  'Waffles',
  'Pancakes',
  'Snuggles',
  'Doodlebug',
  'Fizzlepop',
  'Grumbles',
  'Jiggly',
  'Loopy',
  'Munchkin',
  'Pips',
  'Snicker',
  'Whirl',
];
