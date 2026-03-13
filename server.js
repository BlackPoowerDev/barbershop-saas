import routerBarbers from './routes/barbers.routes.js'
import routerUsers from './routes/users.routes.js'

import express from 'express'
import 'dotenv/config'

const app = express()
app.use(express.json())

app.use('/v1/users', routerUsers)
app.use('/v1/barbers', routerBarbers)

app.listen(process.env.PORT, () =>{
    console.log('Serve run port: ' + process.env.PORT);
})