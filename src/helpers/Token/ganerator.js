
export const ganeratorToken = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charsLen = chars.length;
  let token = '';

  // Browser secure RNG
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(length);
    window.crypto.getRandomValues(arr);
    for (let i = 0; i < length; i++) {
      token += chars[arr[i] % charsLen];
    }
    return token;
  }

  // Fallback (simple)
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * charsLen));
  }
  return token;
};
