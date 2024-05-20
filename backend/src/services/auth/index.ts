import { Users } from '@prisma/client';
import { prismaService } from 'helpers/prisma';

export async function getUserByEmail(email: string) {
    try {
        return await prismaService.users.findFirst({
            where: {
                email: email
            }
        });
    } catch (e) {
        return false;
    }
}


export async function saveUserToken(token: string, user: Users) {
    const now = new Date();
    try {
        return await prismaService.userTokens.create({
            data: {
                token: token,
                userId: user.id,
                createdAt: new Date(),
                expiredAt: new Date(now.setDate(now.getDate() + 1))
            },
            include: {
                user: true
            }
        });
    } catch (e) {
        return false;
    }
}