import AuthController from 'controllers/auth';
import { Router } from 'express';

export interface IBackendRouter {
    prefix: string;
    controller: Router;
}

export const Routes: IBackendRouter[] = [
    {
        prefix: '/auth',
        controller: AuthController
    }
]