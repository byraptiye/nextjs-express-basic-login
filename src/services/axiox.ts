import axios from "axios";

export const axiosService = axios.create({
    baseURL: 'http://localhost:2000/'
})