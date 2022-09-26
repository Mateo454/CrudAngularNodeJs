const { request } = require('express');
const { response } = require('express');
const libro = require('../models/libro');
const Libro= require('../models/libro');

//Creacion del libro
const crearLibro = async(req,res=response)=>{
    const _id=request._id;
    const { titulo }= req.body;

    try {

        //verificacion del titulo
        const existeTitulo = await Libro.findOne( { titulo } );

        if( existeTitulo ) {
            return res.status(404).json({
            ok:false,
            msg: '405 el titulo del nombre ya existe',
            error: req.url
        })
        }   

        //instancia del modelo del dato
        const libro = new Libro({
            libro: _id,
            ...req.body
        });

        
        await libro.save();
        res.status(200).json({
            ok:true,
            msg: '200 sucefull',
            _id: libro.id,
            url:req.url,
            libro
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg: '400 bad request'  
        })
    }
}


//obtener listado de libros

const getLibro = async(req,res=response)=>{

 try {

    const libros=await Libro.find();
    res.status(200).json({
        ok:true,
        libros
    });

     
 } catch (error) {
     console.log(error);
     
 }
    

}

//obtener detalles de un libro seleccionado
const getLibroDetalle = async(req,res=response)=>{
    const id= req.params.id;
    try {
        const libro = await Libro.findById(id);
        
        if (!libro){
            return res.status(404).json({
                ok:false,
                msg: 'No existe libro'
            })
        };

        res.status(200).json({
            ok:true,
            libro
        });



    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: '400 Bad request'
        })
    }

   }
//Actualizar libro

const updateLibro = async(req, res=response)=>{
    const id = req.params.id;
    const _id = req._id;
    
    try {
        const libro = await Libro.findById(id);
        if (!libro){
            return res.status(404).json({
                ok:false,
                msg: 'No existe libro'
            })
        };

        //modificar datos

        const modificarDatosLibro = {
            ...req.body,
            libro: _id
        }
        
        const libroActualizado=await Libro.findByIdAndUpdate(id, modificarDatosLibro, { new:true });

        res.status(200).json({
            ok:true,
            libro: libroActualizado
        })
    } catch (error) {

        console.log(error);
        res.status(400).json({
            ok: false,
            msg: '400 Bad request'
        })
    }
}


//eliminar Libro

const deleteLibro = async(req, res=response)=>{
    const _id = req.params.id;
    try {

        const existeLibro = await Libro.findById(_id);
        if(!existeLibro){
            return res.status(404).json({
                ok:false,
                msg: 'No existe libro'
            })
        }

        await libro.findByIdAndDelete(_id)
        res.json({
            ok:true,
            msg: 'Libro eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: '400 Bad request'
        })
        
    }
}

module.exports={
    crearLibro,
    getLibro,
    getLibroDetalle,
    updateLibro,
    deleteLibro
}