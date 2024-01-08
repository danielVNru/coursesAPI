import {Pool} from 'pg'

const local_db = {
    user: 'postgres', 
    password: 'qweqwe',
    host: 'localhost',
    port: 5432,
    database: 'granate'
}

const server_db = {
    user: 'postgres', 
    password: 'qwerty',
    host: '95.163.233.25',
    port: 5432,
    database: 'granate'
}

const pool = new Pool(local_db)

export const db = pool