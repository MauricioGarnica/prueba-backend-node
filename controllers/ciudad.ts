import { Request, Response } from "express";
import conn from "../database/connection";

export const getCiudades = (req: Request, res: Response) => {
    conn.query('CALL SP_CIUDADES_OBTENER_TODOS()', (error, rows) => {
        if(error){
            res.status(400).json({
                msg: error
            });
        }
        const ciudades = Object.values(JSON.parse(JSON.stringify(rows)));
        const cities = ciudades[0];

        res.json({
            cities
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
        const ciudad = Object.values(JSON.parse(JSON.stringify(rows)));
        const city = ciudad[0];

        res.json({
            city
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
        const ciudades = Object.values(JSON.parse(JSON.stringify(rows)));
        const cities = ciudades[0];

        res.json({
            cities
        })
    });
};