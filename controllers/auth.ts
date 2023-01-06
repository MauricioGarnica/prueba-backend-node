import { Request, Response } from "express";
import conn from "../database/connection";
import bcrypt from 'bcrypt';
import { generarJWT } from "../helpers/generar-jwt";

const login = async (req: Request, res: Response) => {
    const { correo, usuario, password } = req.body;
    let usuarioEncontrado: any;

    try {
        /* Verificamos si el correo existe en la BD */
        conn.query('SELECT usuario_id, rol_id, correo, usuario, contrasenia, nombre, rol FROM usuarios INNER JOIN roles' + 
        'ON usuarios.rol_id = roles.rol_id WHERE baja = 1 AND (correo = ? OR usuario = ?)', [correo, usuario], (error, rows) => {
            /* Mandamos mensaje de error por si se da */
            if (error) {
                return res.status(400).json({
                    msg: error
                });
            }

            /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
            const usuarios: Object[] = Object.values(JSON.parse(JSON.stringify(rows)));
            usuarioEncontrado = Object.assign({}, usuarios[0]);
        });

        /* Verificamos la contraseña */
        const validPassword = bcrypt.compareSync(password, usuarioEncontrado.contrasenia);
        if(!validPassword){
            return res.status(400).json({
                msg: 'La contraseña es inválida, pruebe de nuevo'
            });
        }

        /* Generar el JWT */
        const token = await generarJWT(usuarioEncontrado.usuario_id);

        res.status(200).json({
            token,
            usuarioEncontrado
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
}

export {
    login
}