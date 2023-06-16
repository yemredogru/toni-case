const express = require('express');

//db connection
const connectDB = require('./helpers/connectDb')

//routers
const userRouter = require('./routes/userRoute')
const postRouter = require('./routes/postRoute')

const app = express()

//cors settings
const cors = require('cors')
app.use(cors({
    origin: "*",
    credentials: true,
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.use('/user',userRouter)
app.use('/post',postRouter)

connectDB()
app.listen(3001,()=>{
    console.log("Port 3001")
})