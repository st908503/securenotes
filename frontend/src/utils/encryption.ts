import CryptoJS from "crypto-js";

const SECRET_KEY =
  import.meta.env.VITE_AES_SECRET_KEY;

/*
|--------------------------------------------------------------------------
| Encrypt Note
|--------------------------------------------------------------------------
*/

export const encryptNote = (
  text: string
): string => {
  return CryptoJS.AES.encrypt(
    text,
    SECRET_KEY
  ).toString();
};

/*
|--------------------------------------------------------------------------
| Decrypt Note
|--------------------------------------------------------------------------
*/

export const decryptNote = (
  encryptedText: string
): string => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedText,
    SECRET_KEY
  );

  return bytes.toString(CryptoJS.enc.Utf8);
};