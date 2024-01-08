import { UserRegData, UserRegResponce } from "../Models/UserRegModels";
import { saltPassword } from "../utils/createSaltPass";

import { db } from '../config/db';
import { randomNum } from "../utils/generateNumbers";
import { UserAuthData, UserAuthResponce } from "../Models/UserAuthModels";
import md5 from "md5";
import { Request, Response } from "express";
import { getUserData } from "../Models/userDataModels";

export class User {
    async create(req: UserRegData, res: UserRegResponce){

        const {login, name, password} = req.body

        /**
         * Проверка логина на уникальность
         */
        let result = await db.query(`SELECT * FROM users WHERE login = $1`, [login])
        if (result.rowCount) {
            res.status(400).json({status: 'error', errors: {login: 'Логин уже занят!'}})
            return
        }

        const timestamp = new Date().getTime()

        const {salt, sPass} = saltPassword(password)

        let publicID = ''

        do {
            /**
             *  Генерация публичного ID и проверка на уникальность, если данный ID уже занят, то он генерируется заного
             */

            publicID = randomNum(4)
            result = await db.query(`SELECT * FROM users WHERE public_id = $1`, [publicID])
        } while (result.rowCount)

        result =  await db.query(`INSERT INTO users (name, login, password, salt, create_timestamp, public_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING public_id`, [name, login, sPass, salt, timestamp, publicID])

        const {public_id} = result.rows[0]

        res.status(201).json({status: 'ok', id: public_id})
    }

    async authorize(req: UserAuthData, res: UserAuthResponce){

        const {login, password} = req.body

        let result = await db.query(`SELECT id, salt, password FROM users WHERE login = $1`, [login])

        let errs = false 

        let userID = ''

        if (result.rowCount){

            const {id, salt, password: dbPassword} = result.rows[0]
            userID = id
            
            if (dbPassword != saltPassword(password, salt).sPass){
                errs = true
            }

        } else {
            errs = true
        }

        if (errs) {
            res.status(400).json({
                status: 'error',
                errors: {
                    login: 'Некорректный логин или пароль!'
                }
            })
            return
        }

        let token = ''

        do {
            token = md5(Math.random() + new Date().getTime() + 'a')
            result = await db.query(`SELECT * FROM tokens WHERE token = $1`, [token])
        } while (result.rowCount)

        const timestamp = new Date().getTime()

        result = await db.query(`INSERT INTO tokens (user_id, token, create_timestamp) VALUES ($1, $2, $3) RETURNING token`, [userID, token, timestamp])

        res.json({
            status: 'ok',
            token: result.rows[0].token
        })
    }

    async info(req: Request, res: Response){
        res.json({status: 'ok', data: getUserData()})
    }

}


