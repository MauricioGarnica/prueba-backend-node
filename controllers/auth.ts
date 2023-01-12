import { Request, Response } from "express";
import conn from "../database/connection";
import bcrypt from 'bcrypt';
import { generarJWT } from "../helpers/generar-jwt";
import mysql from 'mysql2/promise';

export const login = async (req: Request, res: Response) => {
    const { correo_usuario, password } = req.body;
    let usuarioEncontrado: any;

    try {
        const connection = await mysql.createConnection({
            host: process.env.HOST || 'localhost',
            user: process.env.USER || 'root',
            password: process.env.PASSWORD || 'root',
            database: process.env.DATABASE || 'prueba_backend',
            port: 3306 || process.env.DB_PORT
        });

        /* Verificamos si el correo existe en la BD */
        const [rows] = await connection.query('SELECT usuarios.usuario_id, usuarios.correo, usuarios.usuario, usuarios.contrasenia, usuarios.nombre, roles.rol_id, roles.rol FROM usuarios INNER JOIN roles ON roles.rol_id = usuarios.rol_id WHERE usuarios.baja = 1 AND (usuarios.correo LIKE ? OR usuarios.usuario LIKE ?)', [correo_usuario, correo_usuario]);
        /* Mandamos mensaje de error por si se da */
        if (!rows) {
            return res.status(400).json({
                msg: "El correo o el usuario es invalido, pruebe de nuevo",
            });
        }

        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const usuarios: Object[] = Object.values(JSON.parse(JSON.stringify(rows)));
        usuarioEncontrado = Object.assign({}, usuarios[0]);

        /* Verificamos la contraseña */
        const validPassword = bcrypt.compareSync(password, usuarioEncontrado.contrasenia);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'La contraseña es inválida, pruebe de nuevo'
            });
        }

        /* Generar el JWT */
        const token = await generarJWT(usuarioEncontrado["usuario_id"]);

        /* Mandamos a llamar al SP de Inicio de sesion para guardar el token en la BD y registrar el movimiento en la bitacora */
        conn.query('CALL SP_USUARIOS_INICIO_SESION(?, ?)', [usuarioEncontrado["usuario_id"], token], (error, rows) => {
            if (error) {
                res.status(400).json({
                    msg: error
                })
            }

            res.status(200).json({
                token,
                usuarioEncontrado
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
}

export const logout = async (req: Request, res: Response) => {
    const { usuario_id } = req.body;

    conn.query("CALL SP_USUARIOS_CERRAR_SESION(?)", [usuario_id], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }

        /* Mandamos el resultado */
        res.status(200).json({
            msg: "Sesión cerrada con éxito"
        });
    });
}