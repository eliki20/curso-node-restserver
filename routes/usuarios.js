const {Router} = require('express');
const {check} = require('express-validator');
const {esRoleValido, emailExiste, existeUsuarioPorId} = require('../helpers/db-validators');
const Role = require('../models/role');
const {usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch} = require('../controller/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
router.get('/', usuariosGet)

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.post('/',[
    check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    check('correo').custom(emailExiste), //validar si existe el correo
    check('password', 'El Password es obligatorio y debe tener mas de 6 letras').isLength({min: 6}),
    //check('rol', 'No es un Rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.delete('/:id',[
    check('id', 'No es un ID valido ').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;