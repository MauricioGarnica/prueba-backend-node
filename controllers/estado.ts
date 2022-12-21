import { Request, Response } from "express";
import conn from "../database/connection";

export const getEstados = (req: Request, res: Response) => {
    conn.query('CALL SP_ESTADOS_OBTENER_TODOS()', function(error, rows){
        if(error){
            res.status(400).json({
                msg: error
            });
        }
        const estados = Object.values(JSON.parse(JSON.stringify(rows)));
        const states = estados[0];

        res.json({
            states
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
        const estado = Object.values(JSON.parse(JSON.stringify(rows)));
        const state = estado[0];

        res.json({
            state
        });
    });
};