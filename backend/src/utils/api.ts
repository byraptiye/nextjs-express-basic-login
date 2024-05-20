import { Response } from 'express';

export interface IApiType {
    statusCode: number;
    message: string;
}

export const apiResponser = (res: Response, apiType: IApiType, message = '', data: unknown = [], error:boolean = false, errorField:string | null = null) =>
    res.status(apiType.statusCode).json({
        statusCode: apiType.statusCode,
        message: apiType.message,
        requestMessage: message,
        data: data,
        error: error,
        errorField: errorField
    });