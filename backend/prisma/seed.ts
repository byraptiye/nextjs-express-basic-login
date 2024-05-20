import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const mockUser = {
    name: 'Mucahit',
    surname: 'Yilmaz',
    email: 'muco467@gmail.com',
    phoneNumber: '+905543975960',
    password: bcrypt.hashSync('12345678', 10),
}

const createMockUser = async () => {
    await prisma.users.create({data: mockUser})
}

createMockUser().finally(() => {
    console.log('🚀 ~ All users seeded');
})