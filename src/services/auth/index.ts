import { axiosService } from "../axiox";

export const AuthServices = {
    Login: async ({ email, password }: {email:string,password:string}) => await axiosService.post('/auth/login',{email,password})
}