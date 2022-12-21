import { Request, Response } from "express";
import conn from "../database/connection";

/*
 *  Función que permite la obtención de los estados al completo
*/
export const getEstados = (req: Request, res: Response) => {
    /*
     * Iniciamos la consulta del procedimeinto almacenado 
    */
    conn.query('CALL SP_ESTADOS_OBTENER_TODOS()', function(error, rows){
        /*
         * Mandamos mensaje de error por si se da
        */
        if(error){
            res.status(400).json({
                msg: error
            });
        }
        
        /*
         * Desestructuro la respuesta para hacerlo un arreglo de objetos 
        */
        const estados = Object.values(JSON.parse(JSON.stringify(rows)));
        const states = estados[0];

        /*
         * Mandamos el resultado 
        */
        res.json({
            states
        });
    });
};

/*
 *  Función que permite la obtención de un estado por su id
*/
export const getEstado = (req: Request, res: Response) => {
    /* Obtenemos el id que fue pasado por parametro en la URL */
    const {id} = req.params;

    /*
     * Iniciamos la consulta del procedimeinto almacenado 
    */
    conn.query('CALL SP_ESTADOS_OBTENER_UNO(?)', [id], (error, rows) => {
        /*
         * Mandamos mensaje de error por si se da.
        */
        if(error){
            res.status(400).json({
                msg: error
            });
        }

        /* Desestructuro la respuesta para hacerlo un arreglo de objetos  */
        const estado = Object.values(JSON.parse(JSON.stringify(rows)));
        const state = estado[0];

        /* Mandamos el resultado  */
        res.json({
            state
        });
    });
};