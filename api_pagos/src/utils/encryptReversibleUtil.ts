import CryptoJS from 'crypto-js';

const secret = 'miSecretoUnico123!'; // Cambia esto por un secreto seguro

// Función para cifrar
export function encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, secret).toString();
}

// Función para descifrar
export function decrypt(encryptedText: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedText, secret);
    return bytes.toString(CryptoJS.enc.Utf8);
}
