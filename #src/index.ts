
import express from 'express'
import { error404 } from './types'
import {userRouter} from './Routes/UserRoute'



const app = express()

app.use('/api', userRouter)



app.use((req, res: error404)=>{
    res.status(400).json({
        error: 'API`s not found'
    })
})
const PORT = 3000

app.listen(PORT, ()=>{
    console.log('Server started on port: '+ PORT);
})