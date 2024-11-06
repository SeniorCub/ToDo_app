import express from 'express'
import userRouter from './src/routes/user.route.js'

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

// routes
app.use('/api/user',userRouter)

const port = 3030
app.listen(port, () => {
     console.log(`
          Server is running.
          http://localhost:${port}
     `)
})