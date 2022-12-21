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
        const clientes = Object.values(JSON.parse(JSON.stringify(rows)));
        const clients = clientes[0];

        res.json({
            clients
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
        const cliente = Object.values(JSON.parse(JSON.stringify(rows)));
        const client = cliente[0];

        res.json({
            client
        });
    });
};

export const getLatYLng = async(req: Request, res: Response) => {
    const {calle, colonia, cp} = req.body;

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

    res.json({
        latitud,
        longitud
    });
};

export const postCliente = async (req: Request, res: Response) => {
    const {razon_social, telefono, correo, referencia, calle, colonia, cp, ciudad_id, estado_id, latitud, longitud, fecha_creacion} = req.body;

    const cliente = new Cliente(razon_social, telefono, correo, referencia, calle, colonia, cp, ciudad_id, estado_id, latitud, longitud, fecha_creacion, 1);

    conn.query('CALL SP_CLIENTES_INSERTAR(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',[
        cliente.razon_social,
        cliente.telefono,
        cliente.correo,
        cliente.referencia,
        cliente.calle,
        cliente.colonia,
        cliente.cp,
        cliente.ciudad_id,
        cliente.estado_id,
        cliente.latitud,
        cliente.longitud
    ], (error, rows) => {
        if(error){
            res.status(400).json({
                msg: error
            });
        }

        res.json({
            msg: 'El cliente ha sido agregado con éxito',
            rows
        });
    });
};

export const buscarClientes = (req: Request, res: Response) => {
    const {filtro} = req.body;

    conn.query('CALL SP_CLIENTES_BUSCAR(?)', [filtro], (error, rows) => {
        if(error){
            res.status(400).json({
                msg: error
            });
        }
        const clientes = Object.values(JSON.parse(JSON.stringify(rows)));
        const clients = clientes[0];

        res.json({
            clients
        });
    });
};

export const putCliente = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {razon_social, telefono, correo, referencia, calle, colonia, cp, ciudad_id, estado_id, latitud, longitud, fecha_creacion} = req.body;

    const cliente = new Cliente(razon_social, telefono, correo, referencia, calle, colonia, cp, ciudad_id, estado_id, latitud, longitud, fecha_creacion, 1);

    conn.query('CALL SP_CLIENTES_MODIFICAR(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',[
        id,
        cliente.razon_social,
        cliente.telefono,
        cliente.correo,
        cliente.referencia,
        cliente.calle,
        cliente.colonia,
        cliente.cp,
        cliente.ciudad_id,
        cliente.estado_id,
        cliente.latitud,
        cliente.longitud
    ], (error, rows) => {
        if(error){
            res.status(400).json({
                msg: error
            });
        }

        res.json({
            msg: 'El cliente ha sido modificado con éxito',
            rows
        });
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

        res.json({
            msg: 'El cliente ha sido eliminado con éxito',
            rows
        });
    });
};