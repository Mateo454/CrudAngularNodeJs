const { Router } = require('express');
const { check } = require('express-validator');
const { crearLibro, getLibro, getLibroDetalle, updateLibro, deleteLibro } = require('../controllers/inventario');
const { validarCampos } = require('../middlewares/validaciones');
const router=Router();


//Creacion de un libro
router.post('/lists',[
    check('titulo','El titulo es obligatorio').not().isEmpty(),
    check('autor','El autor es obligatorio').not().isEmpty(),
    check('apublicacion','El año de publicacion es obligatorio').not().isEmpty(),
    check('editorial','La editorial obligatorianpm').not().isEmpty(),
    check('categoria','La categoria es obligatoria').not().isEmpty(),
    check('sede','La sede es obligatoria').not().isEmpty(),
    validarCampos
                    ],crearLibro)
//Obtener inventario de libros
router.get('/lists',getLibro);

//Obtener detalles del libro
router.get('/lists/:id', getLibroDetalle)

router.put('/lists/:id',updateLibro);

router.delete('/lists/:id',deleteLibro)

module.exports=router;
