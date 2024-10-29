import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

const secret = 'miSecretoUnico123!'; // Debe coincidir con el secreto del backend

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor() { }

  // Función para cifrar en el frontend
  encrypt(text: string) {
    return CryptoJS.AES.encrypt(text, secret).toString();
  }

  // Función para descifrar en el frontend
  decrypt(encryptedText: string) {
    const bytes = CryptoJS.AES.decrypt(encryptedText, secret);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}


