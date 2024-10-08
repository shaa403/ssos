
"use strict";

/**
 * This function generates a random string (a-z, 0-9) of size (x).
 */
export function randalphabets(size) {
  const chars = [
     "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
     "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
  ];
  let rand = "";
  for (let i = 0; i < size; ++i) {
      rand += chars[Math.floor(Math.random() * (chars.length -  1))]; 
  }
  return rand;
}
