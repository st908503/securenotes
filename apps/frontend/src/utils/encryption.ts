import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_AES_SECRET_KEY;

export const encryptNote = (text: string): string => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decryptNote = (encryptedText: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);

  return bytes.toString(CryptoJS.enc.Utf8);
};
