import crypto from 'crypto';

export function generateCheckInCode() {
  // 6 haneli, yazması kolay kod
  const n = Math.floor(Math.random() * 1_000_000);
  return String(n).padStart(6, '0');
}

export function generateWifiPassword() {
  // Router'da yazılacak şekilde okunabilir: 10-12 karakter
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 0/O, 1/I gibi benzerler azaltıldı
  const bytes = crypto.randomBytes(16);
  let out = '';
  for (let i = 0; i < bytes.length; i++) {
    out += alphabet[bytes[i] % alphabet.length];
    if (out.length >= 12) break;
  }
  return out;
}

