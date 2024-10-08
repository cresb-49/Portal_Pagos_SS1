export interface UserToken {
    id: string;
    nombreUsuario: string;
    email: string;
    idRol: string;
}

export interface UserRegister {
    nombreUsuario: string;
    email: string;
    password: string;
    nombres: string;
    apellidos: string;
    numeroCuenta: string;
    idEntidadFinanciera: number;
    idEmpresa?: number;
}
