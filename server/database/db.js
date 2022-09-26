const moongose=require('mongoose');

//Conexion a bd

const dbCON= async()=>{
    try {
        await moongose.connect(process.env.DB_CONECTION_MONGODB,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('Connected to DB');
    } catch (err) {
        console.log(err);
        process.exit(1);//para salir del error
    }

}

module.exports={

    dbCON
}