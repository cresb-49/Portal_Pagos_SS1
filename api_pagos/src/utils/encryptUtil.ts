import bcrypt from 'bcrypt';

// Número de saltos para el hashing del texto plano
const SALT_ROUNDS = 10;

/**
 * Encripta una cadena de texto.
 * @param value - La cadena a encriptar.
 * @returns La cadena encriptada.
 */
export const encrypt = async (value: string): Promise<string> => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(value, salt);
    return hashedPassword;
};

/**
 * Compara una cadena de texto con una cadena encriptada.
 * @param value - La cadena de texto a comparar.
 * @param hashedValue - La cadena encriptada.
 * @returns true si las cadenas coinciden, false en caso contrario.
 */
export const compare = async (value: string, hashedValue: string): Promise<boolean> => {
    return await bcrypt.compare(value, hashedValue);
};
