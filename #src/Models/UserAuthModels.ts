import { Response } from "express"
import { ResWithBody } from "../types"

export type UserAuthData = ResWithBody<{
    login: string,
    password: string
}>

export type UserAuthResponce = Response<{
    status: string,
    errors?: object,
    token?: string
}>