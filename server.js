const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors')
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();

const userRoutes = require('./routes/user.routes.js')

connectDB();

const app = express();


app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/users',userRoutes);

const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`server is running ${process.env.DEV_MODE} on ${PORT}`.bgCyan.white);
})