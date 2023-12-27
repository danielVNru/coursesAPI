
import express from 'express'

/**
 * Ошибка, сигнализирующая об отсутствии API
 * 
 * @param {string} error - текст ошибки
 * 
 */
export type error404 = express.Response<{
    error: string
}>