
import { Response } from "express"
import { ResWithBody } from "../types"

export type UserRegData = ResWithBody<{
    name: string,
    login: string,
    password: string
}>

export type UserRegResponce = Response<{
    status: string,
    errors?: object,
    id?: string
}>