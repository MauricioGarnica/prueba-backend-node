import { Request, Response } from "express";
import conn from "../database/connection";

/* Función que permite la obtención de las ciudades al completo */
export const getCiudades = (req: Request, res: Response) => {
    /* Iniciamos la consulta del procedimeinto almacenado */
    conn.query('CALL SP_CIUDADES_OBTENER_TODOS()', (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if(error){
            res.status(400).json({
                msg: error
            });
        }

        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const ciudades = Object.values(JSON.parse(JSON.stringify(rows)));
        const cities = ciudades[0];

        /* Mandamos el resultado */
        res.json({
            cities
        });
    })
};

/* Función que permite la obtención de una ciudad en específico gracias a un ID */
export const getCiudad = (req: Request, res: Response) => {
    /* Obtenemos el id que fue pasado por parametro en la URL */
    const {id} = req.params;

    /* Iniciamos la consulta del procedimeinto almacenado pasando como parametro el ID */
    conn.query('CALL SP_CIUDADES_OBTENER_UNO(?)', [id], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if(error){
            res.status(400).json({
                msg: error
            });
        }

        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const ciudad = Object.values(JSON.parse(JSON.stringify(rows)));
        const city = ciudad[0];

        /* Mandamos el resultado */
        res.json({
            city
        });
    });
};

/* Función que permite la obtención de las ciudades de un estado a traves de su ID */
export const getCiudadesPorEstado = (req: Request, res: Response) => {
    /* Obtenemos el id que fue pasado por parametro en la URL */
    const {id} = req.params;

    /* Iniciamos la consulta del procedimeinto almacenado pasando como parametro el ID */
    conn.query('CALL SP_CIUDADES_OBTENER_TODOS_ESTADO(?)', [id], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if(error){
            res.status(400).json({
                msg: error
            });
        }

        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const ciudades = Object.values(JSON.parse(JSON.stringify(rows)));
        const cities = ciudades[0];

        /* Mandamos el resultado */
        res.json({
            cities
        })
    });
};