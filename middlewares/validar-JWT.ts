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
        const connection = await mysql.createConnection({
            host: process.env.HOST || 'localhost',
            user: process.env.USER || 'root',
            password: process.env.PASSWORD || 'root',
            database: process.env.DATABASE || 'prueba_backend',
            port: 3306 || process.env.DB_PORT
        });

        const { id } = jwt.verify(token, (process.env.SECRETORPRIVATEKEY) ? process.env.SECRETORPRIVATEKEY : '2rKJ6vq:%P72$W/c4n');

        /* Verificamos si el usuario existe o esta dado de baja */
        const [rows, fields] = await connection.execute("CALL SP_USUARIOS_OBTENER_UNO(?)", [id]);

        if(!rows){
            res.status(400).json({
                msg: "No esta el usuario disponible en la BD",
                rows
            });
        }

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