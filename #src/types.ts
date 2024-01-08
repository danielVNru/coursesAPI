
import express, { Request } from 'express'

/**
 * Ошибка, сигнализирующая об отсутствии API
 * 
 * @param {string} error - текст ошибки
 * 
 */
export type error404 = express.Response<{
    error: string
}>

export type ResWithBody<T> = Request<{}, {}, T>
export type ResWithParams<T> = Request<T>
export type ResWithQuery<T> = Request<{}, {}, {}, T>