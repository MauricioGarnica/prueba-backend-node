import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import conn from "../database/connection";
import mysql from 'mysql2/promise'

const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const connection = await mysql.createConnection('mysql://root:8pe0pnds2igppQotX8CR@containers-us-west-188.railway.app:6522/railway');

        const { id } = jwt.verify(token, (process.env.SECRETORPRIVATEKEY) ? process.env.SECRETORPRIVATEKEY : '2rKJ6vq:%P72$W/c4n');

        /* Verificamos si el usuario existe o esta dado de baja */
        const [rows, fields] = await connection.query("CALL SP_USUARIOS_OBTENER_UNO(?)", [id]);

        if(!rows){
            res.status(400).json({
                msg: "No esta el usuario disponible en la BD",
                rows
            });
        }

        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const usuario = Object.values(JSON.parse(JSON.stringify(rows)));
        const user = usuario[0];

        /* Ponemos el usuario en el req para obtener las propiedades de el con las demás validaciones */
        req.usuario = user;

        next();
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