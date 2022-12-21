import { Request, Response } from "express";
import conn from "../database/connection";

export const getCiudades = (req: Request, res: Response) => {
    conn.query('CALL SP_CIUDADES_OBTENER_TODOS()', (error, rows) => {
        if(error){
            res.status(400).json({
                msg: error
            });
        }
        const ciudades = rows[0];

        res.json({
            ciudades
        });
    })
};

export const getCiudad = (req: Request, res: Response) => {
    const {id} = req.params;

    conn.query('CALL SP_CIUDADES_OBTENER_UNO(?)', [id], (error, rows) => {
        if(error){
            res.status(400).json({
                msg: error
            });
        }
        const ciudad = rows[0];

        res.json({
            ciudad
        });
    });
};

export const getCiudadesPorEstado = (req: Request, res: Response) => {
    const {id} = req.params;

    conn.query('CALL SP_CIUDADES_OBTENER_TODOS_ESTADO(?)', [id], (error, rows) => {
        if(error){
            res.status(400).json({
                msg: error
            });
        }
        const ciudades = rows[0];

        res.json({
            ciudades
        })
    });
};