import { AxiosResponse } from "axios";
import api from ".";
// import { IPlaceApiResponse } from "../models/Places";

export default class AuthService {

    static async loginWithTelegram(id: number) :Promise<AxiosResponse<string>> {

        return api.post(`/tg/login?telegramID=${id}`)
    }
}