import { NextFunction, Request, Response } from "express";
import { db } from "../config/db";
import { setUserData } from "../Models/userDataModels"
import { pick } from "../utils/objectValuesPicker";


export const tokenAuthorizeCheck = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        const token = req.headers.authorization.split(' ')[1]

        const result = await db.query(`SELECT * FROM tokens WHERE token = $1`, [token])

        if ( result.rowCount ) {
            if (result.rows[0].create_timestamp > (new Date().getTime() -  48 * 60 * 60 * 100 )){
                const userQuery = await db.query(`SELECT * FROM users WHERE id = $1`, [result.rows[0].user_id])
                const {public_id: id, name, login, created_at} = userQuery.rows[0]
                setUserData({id, name, login, created_at})
                next()
                return
            } else {
                res.status(401).json({
                    status: 'error',
                    errors: {
                        authorize: 'Действие токена истекло!'
                    }
                })
                return
            }
        }

        res.status(401).json({
            status: 'error',
            errors: {
                authorize: 'Требуется авторизация!'
            }
        })

    }


    // if (!) res.json({status: 'no auth'})
    //     else res.json({status: 'ok'})
    
    // 
};