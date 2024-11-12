import express,{json} from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import { UserRoute } from './Routes/UserRoute.js';
import { AdminRoute } from './Routes/AdminRoute.js';


dotenv.config()

const app= express()
app.use(json());

app.use(cors({
    origin:'http://127.0.0.1:5500',
    credentials:true
}))

// app.use(cookieParser());


app.use('/',UserRoute);
app.use('/',AdminRoute);

const PORT = process.env.port

app.listen(PORT,()=>{
    console.log(`Server is listening ${PORT}`);
})
