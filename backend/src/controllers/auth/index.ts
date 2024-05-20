import { Users } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { apiCodes } from 'constants/api';
import { authMessages } from 'constants/auth';
import express, { Request, Response } from 'express';
import { createJWTToken, credentialsChecker, decodeJWTToken } from 'helpers/auth';
import { getUserByEmail, saveUserToken } from 'services/auth';
import { apiResponser } from 'utils/api';
const AuthController = express.Router();

AuthController.post('/login', async (req: Request, res: Response) => {
    const { email, password } = credentialsChecker(req, res);
    const requestedUser = await getUserByEmail(email)
    if (!requestedUser) {
        return apiResponser(res, apiCodes.empty, authMessages.userNotFound,[], true, 'email');
    }
    if (!bcrypt.compareSync(password, (requestedUser as Users).password as string)){
        return apiResponser(res, apiCodes.empty, authMessages.wrongPassword, [], true, 'password');
    }else{
        delete requestedUser.password;
        const token = createJWTToken(requestedUser as unknown as Users);
        await saveUserToken(token, requestedUser as Users);
        return apiResponser(res, apiCodes.success, authMessages.successLogin, token);
    }
})

AuthController.post('/jwt', (req: Request, res: Response) => {
    const { token } = req.body;
    if (!token) return apiResponser(res, apiCodes.empty, 'Geçersiz token', [], true, 'token');
    return apiResponser(res, apiCodes.success, 'JWT token başarı ile decode edildi.', decodeJWTToken(token));
});

export default AuthController;