const {response, request} = require('express');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

const validarJWT = async (req = request, res = response, next) =>{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No existe Token en la peticion'
        });
    }

    try { 
        // Funcion que verifica la valides del token
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);

         // Si el usuario no existe o está bloqueado, lanzar un error
        if (!usuario) {
            return res.status(401).json({
                msg: 'El token no es valido - usuario borrado de la DB'
            });
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'El token no es valido - usuario con estado false'
            });
        }
        next();

        res.usuario = usuario;
        res.uid = uid;
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no Valido'
        })
    }
    //console.log(token);
}

module.exports = {
    validarJWT
}