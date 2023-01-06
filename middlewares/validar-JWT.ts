import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import conn from "../database/connection";

const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const { id } = jwt.verify(token, (process.env.SECRETORPRIVATEKEY) ? process.env.SECRETORPRIVATEKEY : '2rKJ6vq:%P72$W/c4n');
        let usuario;

        /* Verificamos si el usuario existe o esta dado de baja */
        conn.query('CALL SP_USUARIOS_OBTENER_UNO(?)', [id], (error, rows) => {
            /* Mandamos mensaje de error por si se da */
            if (error) {
                res.status(400).json({
                    msg: error
                });
            }

            /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
            usuario = Object.values(JSON.parse(JSON.stringify(rows)));
        });
        
        if(usuario){
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
};

export {
    validarJWT
}