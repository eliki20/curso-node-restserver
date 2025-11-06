const {Schema, model} = require('mongoose');
const UsuarioSchema = Schema({
    nombre: {
        type : String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contrasena es obligatoria']
    },
    google: {
        type: Boolean,
        default: false
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    img: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
});

//esta funcion quita los campos__v y password y el resto los almacena en variable usuario
UsuarioSchema.methods.toJSON = function(){
    const {_v, password, ...usuario} = this.toObject();
    return usuario;
}
module.exports = model('Usuario', UsuarioSchema);