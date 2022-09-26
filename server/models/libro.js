const { Schema, model }=require('mongoose')
const libroSchema = Schema({
    titulo:{
        type:String,
        required: true,
        unique: true
    },
    autor:{
        type:String,
        required:true
    },
    apublicacion:{
        type:String,
        required:true
    },
    editorial:{
        type:String,
        required:true
    },
    categoria:{
        type:String,
        required:true
    },
    sede:{
        type: String,
        required: true
    }

})

module.exports= model('Libro', libroSchema);