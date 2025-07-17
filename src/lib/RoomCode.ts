// RoomCode.ts

// Adjectives for the room code
const adjectives = [
    'Brave', 'Clever', 'Daring', 'Energetic', 'Fearless', 'Gentle',
    'Happy', 'Jolly', 'Kind', 'Lively', 'Mighty', 'Nimble',
    'Optimistic', 'Playful', 'Quick', 'Radiant', 'Silly', 'Tranquil',
    'Vibrant', 'Witty', 'Zesty', 'Curious', 'Sparkling', 'Whimsical',
    'Mystic', 'Golden', 'Silver', 'Bronze', 'Emerald', 'Ruby',
    'Sapphire', 'Diamond', 'Crystal', 'Velvet', 'Whispering', 'Echoing',
    'Silent', 'Roaring', 'Humming', 'Twinkling', 'Shimmering', 'Glistening',
    'Flowing', 'Soaring', 'Dancing', 'Dreamy', 'Vivid', 'Azure', 'Crimson'
  ];
  
  // Habitats for the room code
  const habitats = [
    'Forest', 'Desert', 'Ocean', 'Mountain', 'River', 'Jungle',
    'Tundra', 'Swamp', 'Cave', 'Volcano', 'Island', 'Glacier',
    'Prairie', 'Wetland', 'Coral', 'Lagoon', 'Oasis', 'Savanna',
    'Canyon', 'Valley', 'Plateau', 'Waterfall', 'Spring', 'Meadow',
    'Marsh', 'Bayou', 'Fjord', 'Archipelago', 'Atoll', 'Geyser',
    'Crater', 'Grotto', 'Cavern', 'Dell', 'Heath', 'Moor',
    'Thicket', 'Grove', 'Copse', 'Fen', 'Bog', 'Estuary',
    'Sound', 'Strait', 'Channel', 'Reef', 'Dune', 'Summit', 'Peak'
  ];
  
  /**
   * Generates a fun, three-word room code.
   * The format is: Adjective-Habitat-RandomNumber.
   *
   * @returns {string} The generated room code.
   */
  export function generateRoomCode(): string {
    // Select a random adjective
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    // Select a random habitat
    const randomHabitat = habitats[Math.floor(Math.random() * habitats.length)];
    // Generate a random number between 100 and 999 for a 3-digit number
    const randomNumber = Math.floor(Math.random() * 900) + 100;
  
    // Combine them into the room code format
    const roomCode = `${randomAdjective}-${randomHabitat}-${randomNumber}`;
    return roomCode;
  }
  
  /**
   * Checks if a given room code string is valid based on the MakeGuestCode format.
   * A valid room code must consist of three parts separated by dashes:
   * 1. An adjective from the predefined list.
   * 2. A habitat from the predefined list.
   * 3. A three-digit number.
   *
   * @param {string} roomCode The room code string to validate.
   * @returns {boolean} True if the room code is valid, false otherwise.
   */
  export function CheckRoomCode(roomCode: string): boolean {
    // Split the room code into parts by the dash separator
    const parts = roomCode.split('-');
  
    // A valid room code must have exactly three parts
    if (parts.length !== 3) {
      return false;
    }
  
    const [adjectivePart, habitatPart, numberPart] = parts;
  
    // 1. Check if the first part is a valid adjective
    // Convert to lowercase for case-insensitive comparison if desired,
    // but for strict validation, keep original case if MakeGuestCode generates specific casing.
    // Here, we assume MakeGuestCode generates capitalized words, so we check against the original list.
    if (!adjectives.includes(adjectivePart)) {
      return false;
    }
  
    // 2. Check if the second part is a valid habitat
    if (!habitats.includes(habitatPart)) {
      return false;
    }
  
    // 3. Check if the third part is a number and is a three-digit number
    const num = parseInt(numberPart, 10);
    if (isNaN(num) || num < 100 || num > 999) {
      return false;
    }
  
    // If all checks pass, the room code is valid
    return true;
  }