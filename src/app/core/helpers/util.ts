import * as CryptoJS from 'crypto-js'; 
import * as CryptoTS from 'crypto-ts';
import { environment } from 'src/environments/environment';

export const encrypt = (data) => {
  const e = CryptoJS.AES.encrypt(
    JSON.stringify(data).toString(),
    environment.encryptionKey.trim()
  ).toString();

  return e;
};

export const decrypt = (data) => {
    const d = CryptoJS.AES.decrypt(
        data.trim(),
   environment.encryptionKey.trim()
  ).toString(CryptoJS.enc.Utf8);

  return d;
};



export const encryptionAES = (msg) =>{
  // Encrypt
  const ciphertext = CryptoTS.AES.encrypt(JSON.stringify(msg), environment.encryptionKey.trim());
  return ciphertext.toString();
}

export const decryptionAES = (msg) => {
  // Decrypt
  const bytes  = CryptoTS.AES.decrypt(msg, environment.encryptionKey.trim());
  const plaintext = bytes.toString(CryptoTS.enc.Utf8);
  return plaintext;
}

