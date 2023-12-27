
import express from 'express'
import { error404 } from './types'

const PORT = 3000

const app = express()

app.use(express.json())

app.post('/api/reg', (req, res)=>{

    res.json({status: 'ok'})

})


app.use((req, res: error404)=>{
    res.status(400).json({
        error: 'API`s not found'
    })
})

app.listen(PORT, ()=>{
    console.log('Server started on port: '+ PORT);
})