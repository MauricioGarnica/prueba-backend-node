import { Request, Response } from "express";
import conn from "../database/connection";

export const getRoles = (req: Request, res: Response) => {
    conn.query("CALL SP_ROLES_OBTENER_TODOS()", (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }

        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const roles = Object.values(JSON.parse(JSON.stringify(rows)));
        const rols = roles[0];

        /* Mandamos el resultado */
        res.json({
            rols
        });
    });
};

export const getRol = (req: Request, res: Response) => {
    const {id} = req.params;

    conn.query("CALL SP_ROLES_OBTENER_UNO(?)", [id], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }

        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const rol = Object.values(JSON.parse(JSON.stringify(rows)));
        const role = rol[0];

        /* Mandamos el resultado */
        res.json({
            role
        });
    });
};