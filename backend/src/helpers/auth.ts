
import { Users } from '@prisma/client';
import { apiCodes } from 'constants/api';
import { authMessages } from 'constants/auth';
import { Request, Response } from 'express';
import { apiResponser } from 'utils/api';
import jwt from 'jsonwebtoken';

export const isEmail = (email: string): boolean => {
    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== '' && email.match(emailFormat)) return true;
    return false;
};

export const credentialsChecker = (req: Request, res: Response): { email: string; password: string } => {
    const { email, password } = req.body;
    if (!email) apiResponser(res, apiCodes.empty, authMessages.emptyEmail);
    if (!password) apiResponser(res, apiCodes.empty, authMessages.emptyPassword);
    if (!isEmail(email)) apiResponser(res, apiCodes.empty, authMessages.invalidEmail);
    if (password.length < 8) apiResponser(res, apiCodes.empty, authMessages.invalidPassword);
    return {
        email,
        password
    };
};


export const createJWTToken = (user: Users, expire = ((60 * 60) * 24)): string => {
    return jwt.sign({ ...user }, process.env.JWT_SECRET_KEY, { expiresIn: expire });
};

export const decodeJWTToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY, (error, result: Users) => {
        if (error) {
            return error.message;
        } else {
            return result;
        }
    });
};