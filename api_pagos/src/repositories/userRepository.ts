import { executeQuery } from "../utils/databaseHandler";

export const getUsers = async () => {
    const users = await executeQuery(async (prisma) => {
        return await prisma.usuario.findMany();
    });
    return users;
}

export const getUsersByNombreUsuario = async (nombreUsuario: string) => {
    const users = await executeQuery(async (prisma) => {
        return await prisma.usuario.findUnique({
            where: {
                nombre_usuario: nombreUsuario
            }
        });
    });
    return users;
}
