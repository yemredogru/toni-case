const express = require('express');
const listEndpoints = require('express-list-endpoints')
const fileUpload = require('express-fileupload')
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

app.use(fileUpload())

app.use('/user',userRouter)
app.use('/post',postRouter)

connectDB()
app.listen(3001,()=>{
    console.log("Port 3001")
})
