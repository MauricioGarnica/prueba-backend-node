import { Request, Response } from "express";
import conn from "../database/connection";
import bcrypt from 'bcrypt';

export const getUsuarios = (req: Request, res: Response) => {
    conn.query('CALL SP_USUARIOS_OBTENER_TODOS()', (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if(error){
            res.status(400).json({
                msg: error
            });
        }

        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const usuarios = Object.values(JSON.parse(JSON.stringify(rows)));
        const users = usuarios[0];

        /* Mandamos el resultado */
        res.json({
            users
        });
    });
};

export const getUsuario = (req: Request, res: Response) => {
    /* Obtenemos el id que fue pasado por parametro en la URL */
    const {id} = req.params;

    conn.query('CALL SP_USUARIOS_OBTENER_UNO(?)', [id], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if(error){
            res.status(400).json({
                msg: error
            });
        }

        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const usuario = Object.values(JSON.parse(JSON.stringify(rows)));
        const user = usuario[0];

        /* Mandamos el resultado */
        res.json({
            user
        });
    });
};

export const postUsuario = (req: Request, res: Response) => {
    /* Obtenemos los datos del usuario que fueron pasados por el body en la URL */
    const {nombre, usuario, contrasenia, correo, rol_id, usuario_id} = req.body;

    /* Encriptamos la contraseña */
    const salt = bcrypt.genSaltSync();
    const password = bcrypt.hashSync(contrasenia, salt);

    conn.query('CALL SP_USUARIOS_INSERTAR(?, ?, ?, ?, ?, ?)', [nombre, usuario, password, correo, rol_id, usuario_id], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if(error){
            res.status(400).json({
                msg: error
            });
        }

        /* Mandamos el resultado */
        res.json({
            msg: 'El usuario ha sido agregado con éxito',
            rows
        });
    });
};

export const putUsuario = (req: Request, res: Response) => {
    /* Obtenemos el ID que fue pasado por el params en la URL */
    const {id} = req.params;
    
    /* Obtenemos los datos del usuario que fueron pasados por el body en la URL */
    const {nombre, usuario, contrasenia, correo, rol_id, usuario_id} = req.body;

    /* Encriptamos la contraseña */
    const salt = bcrypt.genSaltSync();
    const password = bcrypt.hashSync(contrasenia, salt);

    conn.query('CALL SP_USUARIOS_MODIFICAR(?, ?, ?, ?, ?, ?, ?)', [id, nombre, usuario, password, correo, rol_id, usuario_id], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if(error){
            res.status(400).json({
                msg: error
            });
        }

        /* Mandamos el resultado */
        res.json({
            msg: 'El usuario ha sido modificado con éxito',
            rows
        });
    });
};

export const deleteUsuario = (req: Request, res: Response) => {
    /* Obtenemos el ID que fue pasado por el params en la URL */
    const {id} = req.params;

    const {usuario_id} = req.body;

    conn.query('CALL SP_USUARIOS_ELIMINAR(?, ?)', [id, usuario_id], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if(error){
            res.status(400).json({
                msg: error
            });
        }

        /* Mandamos el resultado */
        res.json({
            msg: 'El cliente ha sido eliminado con éxito',
            rows
        });
    });
};

export const buscarUsuario = (req: Request, res: Response) => {
    const {filtro} = req.body;

    conn.query('CALL SP_USUARIOS_BUSCAR(?)', [filtro], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if(error){
            res.status(400).json({
                msg: error
            });
        }

        const usuarios = Object.values(JSON.parse(JSON.stringify(rows)));
        const users = usuarios[0];

        /* Mandamos el resultado */
        res.json({
            users
        })
    });
};