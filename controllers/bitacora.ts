import { Request, Response } from "express";
import conn from "../database/connection";

export const getBitacoras = (req: Request, res: Response) => {
    /* Iniciamos la consulta del procedimeinto almacenado */
    conn.query("CALL SP_BITACORAS_OBTENER_TODOS()", (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if(error){
            res.status(400).json({
                msg: error
            });
        }

        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const bitacoras = Object.values(JSON.parse(JSON.stringify(rows)));
        const logs = bitacoras[0];

        /* Mandamos el resultado */
        res.json({
            logs
        });
    });
};