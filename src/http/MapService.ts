import {AxiosRequestConfig, AxiosResponse } from "axios";
import api from ".";
import { TMapApiResponse } from "../models/maps";

export default class MapService {

    // static async getAvalibleCities() :Promise<AxiosResponse<TCityApiResponse[]>> {
    //     const config: AxiosRequestConfig = {
    //         headers: {
    //             Authorization: auth.currentUser.stsTokenManager.accessToken
    //         },
    //     }
    //     return api.get(`/cities`, config)
    // }



    static async loginWithTelegram(id: number) :Promise<AxiosResponse<string>> {

        return api.post(`/tg/login?telegramID=${id}`)
    }

    static async getPlacesWithTelegram(token: string, id: number) :Promise<AxiosResponse<string>> {

        const config: AxiosRequestConfig = {
            headers: {
                Authorization: token,
                'X-Telegram-ID': id
            },
            params: {
                city: "milan"
            }
        }
        return api.get(`/tg/places`,config)
    }

    // static async getPlacesByCity(city: string, category?: TCategory, filter?: string) :Promise<AxiosResponse<TMapApiResponse[]>> {
    //     const config: AxiosRequestConfig = {
    //         headers: {
    //             Authorization: auth.currentUser.stsTokenManager.accessToken
    //         },
    //         params: {
    //             city: city,
    //             category: category,
    //             labels: filter
    //         },
    //     }
    //     return api.get('/places', config)
    // }

    // static async getPlaceInfo(id: string) :Promise<AxiosResponse<TMapApiResponse>> {
    //     const config: AxiosRequestConfig = {
    //         headers: {
    //             Authorization: auth.currentUser.stsTokenManager.accessToken
    //         },
    //         params: {
    //             id: id
    //         }
    //     }
    //     return api.get(`/places/${id}`, config)
    // }

    // static async getFiltersList() :Promise<AxiosResponse<string[]>> {
    //     const config: AxiosRequestConfig = {
    //         headers: {
    //             Authorization: auth.currentUser.stsTokenManager.accessToken
    //         },
    //     }
    //     return api.get(`/filter`, config)
    // }
}

// currentUser:  {
//     "_redirectEventId": undefined, 
//     "apiKey": "AIzaSyDm6_Anp_qZhxTyhg_FbaYA4A4Y5mm3Z8A", 
//     "appName": "[DEFAULT]", 
//     "createdAt": "1710006203138", 
//     "displayName": "Grushka", 
//     "email": "grishatupikov@gmail.com", 
//     "emailVerified": false, 
//     "isAnonymous": false, 
//     "lastLoginAt": "1710274563111", 
//     "phoneNumber": undefined, 
//     "photoURL": undefined, 
//     "providerData": [[Object]], 
//     "stsTokenManager": {
//         "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwOWY4ZTMzN2ZjNzg1NTE0ZTExMGM2ZDg0N2Y0M2M3NDM1M2U0YWYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiR3J1c2hrYSIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9mYXZzLTg1ZjQ0IiwiYXVkIjoiZmF2cy04NWY0NCIsImF1dGhfdGltZSI6MTcxMDI3NDU2MywidXNlcl9pZCI6IjJRMklVRG5BdE9PZko1dXFkbTNOUkVHdkFWbDEiLCJzdWIiOiIyUTJJVURuQXRPT2ZKNXVxZG0zTlJFR3ZBVmwxIiwiaWF0IjoxNzEwMjc0NTYzLCJleHAiOjE3MTAyNzgxNjMsImVtYWlsIjoiZ3Jpc2hhdHVwaWtvdkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZ3Jpc2hhdHVwaWtvdkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.L6HjL_F3ma_nSy4_yRCAEn8oYrofG1X6FnfkpV41nnVNwL6sqghBnkWDvwjNWuyMzfXylC1kwjWURgM5qBX9yEe0GnrdumtKrtjf0tkloLuFn92T76PHZrnzPEKxu4opXZWalju77BTz7Kiz4aSJlnTaJs31PxOm-DpS7hklFWfU-mxP0I4aIQ56FhpPvUaYEn0hE8EaZbDr3pLqb46c_u3wvJzCYgWQ2Y7MCQkwEVymIHF-bHOWlKqK5dz_8H9p_3fGFmOTn0a2gHjym_V4M2pebkomE6ffefbaukm1o3VmbNVOYfRSp9dQi1AtJQzKy2R3lnG3pV-vdAHyOcqSRg", 
//         "expirationTime": 1710278163072, 
//         "refreshToken": "AMf-vBz36MVWkgfT4HbBSIvV4zasd54dy6CUQ9k_Ug5KjTl7Xda3nuvrpuK0DPCS_Vq4StYQiNXrA1y8uxcHPb6Tg0T310NC-GJFCuLD4iLBBd_xpEvxVpWG_884eh0LjsAfwuqFn4XaSzzT2V86MF33nA3ZFDXPagaerogVAltZ3HPe9kX_HvukB5dWvbPb7jahcK8SS-iTaVXdErK-2y-xVjWIo59zkA"
//     }, 
//     "tenantId": undefined,
//     "uid": "2Q2IUDnAtOOfJ5uqdm3NREGvAVl1"
// }