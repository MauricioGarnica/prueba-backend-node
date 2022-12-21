import { Request, Response } from "express";
import conn from "../database/connection";
import Cliente from "../models/cliente";
import fetch from "cross-fetch";

export const getClientes = (req: Request, res: Response) => {
    conn.query('CALL SP_CLIENTES_OBTENER_TODOS()', (error, rows) => {
        if(error){
            res.status(400).json({
                msg: error
            });
        }
        const clientes = rows[0];

        res.json({
            clientes
        });
    })
};

export const getCliente = (req: Request, res: Response) => {
    const {id} = req.params;

    conn.query('CALL SP_CLIENTES_OBTENER_UNO(?)', [id], (error, rows) => {
        if(error){
            res.status(400).json({
                msg: error
            });
        }
        const cliente = rows[0];

        res.json({
            cliente
        });
    });
};

export const postCliente = async (req: Request, res: Response) => {
    const {razon_social, telefono, correo, referencia, calle, colonia, cp, ciudad_id, estado_id, fecha_creacion} = req.body;

    let oracion = "";
    const calle_desestructurada = calle.split(' ');
    const colonia_desestructurada = colonia.split(' ');

    calle_desestructurada.forEach((calle: string) => {
        oracion = oracion + calle + "+";
    });
    colonia_desestructurada.forEach((colonia: string) => {
        oracion = oracion + colonia + "+";
    });

    oracion = oracion + cp;

    const result = await fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${oracion}&apiKey=Zt_mvFl5zPMvNhOhmtrgZypThCHTUFLKBbQaTLZPa80`);
    const {items} = await result.json();

    const latitud = items[0].position.lat;
    const longitud = items[0].position.lng;

    // const cliente = Cliente;

    res.json({
        oracion,
        latitud
    })
};

export const putCliente = async (req: Request, res: Response) => {
    res.json({
        msg: 'putCliente'
    });
};

export const deleteCliente = (req: Request, res: Response) => {
    const {id} = req.params;

    conn.query('CALL SP_CLIENTES_ELIMINAR(?)', [id], (error, rows) => {
        if(error){
            res.status(400).json({
                msg: error
            });
        }
        const cliente = rows[0];

        res.json({
            cliente
        });
    });
};