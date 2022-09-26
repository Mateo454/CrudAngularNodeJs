const express=require('express');
const mongoose=require('mongoose');
const {dbCON}=require('./database/db')
const cors = require('cors');

//Creacion del servidor 
const app=express();
//Para la configuracion de las variables de entorno 
require('dotenv').config();
port=3000||process.env.PORT;
dbCON();

//cors
app.use(cors());

//lectura y parseo del body
app.use(express.json() );

app.use('',require('./routes/inventario'))







app.listen(port,()=>{
    console.log('Conected the port ',port)
})

