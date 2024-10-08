import { executeQuery } from "../utils/databaseHandler";

const getUsers = async () => {
    const users = await executeQuery(async (prisma) => {
        return await prisma.usuario.findMany();
    });
    return users;
}

