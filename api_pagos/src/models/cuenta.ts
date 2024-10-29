import { Cuenta } from "@prisma/client";

export interface CrearCuenta {
    id_usuario: number;
    id_entidad_financiera?: number | null;
    numero_cuenta?: string | null;
    saldo: number;
    id_empresa?: number | null;
    create_at?: Date;
    update_at?: Date;
    delete_at?: Date | null;
}
