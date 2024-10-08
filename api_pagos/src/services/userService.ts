import { getUsers, getUsersByNombreUsuario } from '../repositories/userRepository';
import { compare } from 'bcrypt';
import { encrypt } from '../utils/encryptUtil';
import { UserRegister } from '../models/user';

export const getAllUsers = async () => {
    return await getUsers();
}

export const register = async (user: UserRegister) => {
    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await encrypt(user.password);

    // Guardar el usuario en la base de datos (con la contraseña encriptada)

};

export const login = async (nombreUsuario: string, password: string) => {
    const usuario = await getUsersByNombreUsuario(nombreUsuario);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    const isPasswordCorrect = await compare(password, usuario.password);
    if (!isPasswordCorrect) {
        throw new Error('Contraseña incorrecta');
    }
    return usuario;
}
