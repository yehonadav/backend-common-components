import { nanoid } from 'nanoid';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';

// binary to string lookup table
const b2s = alphabet.split('');

// string to binary lookup table
// 123 == 'z'.charCodeAt(0) + 1
const s2b = new Array(123);
for (let i = 0; i < alphabet.length; i++) {
  s2b[alphabet.charCodeAt(i)] = i;
}

export const numberToBase64 = (base10:string) => {
  const n = parseInt(base10, 10);

  let lo = n >>> 0;
  let hi = (n / 4294967296) >>> 0;

  let right = '';
  while (hi > 0) {
    right = b2s[0x3f & lo] + right;
    lo >>>= 6;
    lo |= (0x3f & hi) << 26;
    hi >>>= 6;
  }

  let left = '';
  do {
    left = b2s[0x3f & lo] + left;
    lo >>>= 6;
  } while (lo > 0);

  return left + right;
};

export const base64ToNumber = (base64:string) => {
  let number = 0;
  const sign = base64.charAt(0) === '-' ? 1 : 0;

  for (let i = sign; i < base64.length; i++) {
    number = number * 64 + s2b[base64.charCodeAt(i)];
  }

  return sign ? -number : number;
};

                    // +972507777777
export const phoneShortener = (phoneNumber: string): string =>
  numberToBase64(phoneNumber.substring(1));

export const createAttendantToken = (phoneNumber: string): string =>
  phoneShortener(phoneNumber) + nanoid(6); // chance for collision is 1 to 64^6 (~65B)

