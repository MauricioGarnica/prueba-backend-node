import { Request, Response } from "express";
import conn from "../database/connection";

export const getEstados = (req: Request, res: Response) => {
    conn.query('CALL SP_ESTADOS_OBTENER_TODOS()', function(error, rows){
        if(error){
            res.status(400).json({
                msg: error
            });
        }
        const estados = rows[0];

        res.json({
            estados
        });
    });
};

export const getEstado = (req: Request, res: Response) => {
    const {id} = req.params;

    conn.query('CALL SP_ESTADOS_OBTENER_UNO(?)', [id], (error, rows) => {
        if(error){
            res.status(400).json({
                msg: error
            });
        }
        const estado = rows[0];

        res.json({
            estado
        })
    });
};