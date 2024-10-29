import { Usuario } from "@prisma/client";

export interface UserToken {
    id: string;
    nombreUsuario: string;
    email: string;
    idRol: string;
}

export interface UserRegister {
    email: string;
    password: string;
    nombres: string;
    apellidos: string;
}

export interface UsuarioResponse {
    id_usuario: number;
    nombres: string;
    apellidos: string;
    nombre_usuario: string;
    email: string;
    id_rol: number | null;
    id_estado_usuario?: number | null;
    token?: string;
}

export interface CrearUsuario {
    nombres: string;
    apellidos: string;
    nombre_usuario: string;
    email: string;
    password: string;
    id_rol: number | null;
    id_estado_usuario?: number | null;
    create_at?: Date;
    update_at?: Date;
    delete_at?: Date | null;
}

