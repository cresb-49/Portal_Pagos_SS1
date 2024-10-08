import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function executeQuery<T>(query: (prisma: PrismaClient) => Promise<T>): Promise<T | null> {
    try {
        const result = await query(prisma);
        return result;
    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        return null;
    } finally {
        await prisma.$disconnect();
    }
}
