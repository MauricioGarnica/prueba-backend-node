import { Request, Response } from "express";
import conn from "../database/connection";
import fetch from "cross-fetch";

/* Función que permite la obtención de los clientes al completo */
export const getClientes = (req: Request, res: Response) => {
    /* Iniciamos la consulta del procedimeinto almacenado */
    conn.query('CALL SP_CLIENTES_OBTENER_TODOS()', (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if(error){
            res.status(400).json({
                msg: error
            });
        }

        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const clientes = Object.values(JSON.parse(JSON.stringify(rows)));
        const clients = clientes[0];

        /* Mandamos el resultado */
        res.json({
            clients
        });
    })
};

/* Función que permite la obtención de un cliente en específico gracias a su ID */
export const getCliente = (req: Request, res: Response) => {
    /* Obtenemos el id que fue pasado por parametro en la URL */
    const {id} = req.params;

    /* Iniciamos la consulta del procedimeinto almacenado pasando como parametro el ID */
    conn.query('CALL SP_CLIENTES_OBTENER_UNO(?)', [id], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if(error){
            res.status(400).json({
                msg: error
            });
        }

        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const cliente = Object.values(JSON.parse(JSON.stringify(rows)));
        const client = cliente[0];
        console.log(client);
        

        /* Mandamos el resultado */
        res.json({
            cliente_id: client[0].cliente_id,
            razon_social: client[0].razon_social,
            telefono: client[0].telefono,
            correo: client[0].correo,
            fecha_creacion: client[0].fecha_creacion,
            referencia: client[0].referencia,
            estado_id: client[0].estado_id,
            estado: client[0].estado,
            ciudad_id: client[0].ciudad_id,
            ciudad: client[0].ciudad,
            colonia: client[0].colonia,
            calle: client[0].calle,
            cp: client[0].cp,
            latitud: client[0].latitud,
            longitud: client[0].longitud    
        });
    });
};

/* Función que permite consultar la longitud y la latitud de la dirección */
export const getLatYLng = async(req: Request, res: Response) => {
    /* Obtenemos la calle, colonia y el cp que fue pasado por el body en la URL */
    const {calle, colonia, cp} = req.body;

    /* Variable donde se va a almacenar el resultado de la consulta */
    let oracion = "";

    /* API_KEY de la aplicación HERE */
    const key_api = process.env.API_KEY_HERE || 'Zt_mvFl5zPMvNhOhmtrgZypThCHTUFLKBbQaTLZPa80'

    /* Separamos la cadena de texto por espacios, para crear un arreglo de strings */
    const calle_desestructurada = calle.split(' ');
    const colonia_desestructurada = colonia.split(' ');

    /* En la oración, vamos a ir concatenando cada palabra encontrada junto con el caracter '+' para que funcione la consulta*/
    calle_desestructurada.forEach((calle: string) => {
        oracion = oracion + calle + "+";
    });
    colonia_desestructurada.forEach((colonia: string) => {
        oracion = oracion + colonia + "+";
    });

    /* Al final, concatenamos el cp para que la busqueda sea lo más exacta */
    oracion = oracion + cp;

    /* Realizamos la petición a la API */
    const result = await fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${oracion}&apiKey=${key_api}`);
    const {items} = await result.json();

    /* Obtenemos la latitud y la longitud del objeto */
    const latitud = items[0].position.lat;
    const longitud = items[0].position.lng;

    /* Mandamos el resultado */
    res.json({
        latitud,
        longitud
    });
};

/* Función que permite la inserción de un cliente a la BD */
export const postCliente = async (req: Request, res: Response) => {
    /* Obtenemos los datos del cliente que fueron pasados por el body en la URL */
    const {razon_social, telefono, correo, referencia, calle, colonia, cp, ciudad_id, estado_id, latitud, longitud, usuario_id} = req.body;

    /* Ejecutamos la consulta para hacer la inserción */
    conn.query('CALL SP_CLIENTES_INSERTAR(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',[
        razon_social,
        telefono,
        correo,
        referencia,
        calle,
        colonia,
        cp,
        ciudad_id,
        estado_id,
        latitud,
        longitud,
        usuario_id
    ], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if(error){
            res.status(400).json({
                msg: error
            });
        }

        /* Mandamos el resultado */
        res.json({
            msg: 'El cliente ha sido agregado con éxito',
            rows
        });
    });
};

/* Función que permite la busqueda de clientes a través de un parámetro */
export const buscarClientes = (req: Request, res: Response) => {
    /* Obtenemos la palabra que fue pasada por el body en la URL */
    const {filtro} = req.body;

    /* Iniciamos la consulta del procedimeinto almacenado pasando como parametro la palabra a buscar */
    conn.query('CALL SP_CLIENTES_BUSCAR(?)', [filtro], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if(error){
            res.status(400).json({
                msg: error
            });
        }

        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const clientes = Object.values(JSON.parse(JSON.stringify(rows)));
        const clients = clientes[0];

        /* Mandamos el resultado */
        res.json({
            clients
        });
    });
};

/*Función para modificar los datos del cliente de un cliente en específico */
export const putCliente = async (req: Request, res: Response) => {
    /* Obtenemos el ID que fue pasado por el params en la URL */
    const {id} = req.params;

    /* Obtenemos los datos del cliente que fueron pasados por el body en la URL */
    const {razon_social, telefono, correo, referencia, calle, colonia, cp, ciudad_id, estado_id, latitud, longitud, usuario_id} = req.body;

    /* Ejecutamos la consulta para hacer la modificación */
    conn.query('CALL SP_CLIENTES_MODIFICAR(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',[
        id,
        razon_social,
        telefono,
        correo,
        referencia,
        calle,
        colonia,
        cp,
        ciudad_id,
        estado_id,
        latitud,
        longitud,
        usuario_id
    ], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if(error){
            res.status(400).json({
                msg: error
            });
        }

        /* Mandamos el resultado */
        res.json({
            msg: 'El cliente ha sido modificado con éxito',
            rows
        });
    });
};

/* Función para eliminar un cliente de manera lógica */
export const deleteCliente = (req: Request, res: Response) => {
    /* Obtenemos el ID que fue pasado por el params en la URL */
    const {id} = req.params;

    const {usuario_id} = req.body;

    /* Iniciamos la consulta del procedimeinto almacenado pasando como parametro el ID */
    conn.query('CALL SP_CLIENTES_ELIMINAR(?, ?)', [id, usuario_id], (error, rows) => {
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