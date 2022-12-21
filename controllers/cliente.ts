import { Request, Response } from "express";
import conn from "../database/connection";

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

export const getCliente = async (req: Request, res: Response) => {
    res.json({
        msg: 'getUsuario'
    });
};

export const postCliente = async (req: Request, res: Response) => {
    res.json({
        msg: 'postCliente'
    });
};

export const putCliente = async (req: Request, res: Response) => {
    res.json({
        msg: 'putCliente'
    });
};

export const deleteCliente = async (req: Request, res: Response) => {
    res.json({
        msg: 'deleteCliente'
    });
};