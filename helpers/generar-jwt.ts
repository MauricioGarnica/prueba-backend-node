import jwt from 'jsonwebtoken';

const generarJWT = (id: Number) => {
    return new Promise((resolve, reject) => {
        const payload = {id};

        jwt.sign(payload, (process.env.SECRETORPRIVATEKEY) ? process.env.SECRETORPRIVATEKEY : '2rKJ6vq:%P72$W/c4n', {
            expiresIn: '1d'
        }, (error, token) => {
            if(error){
                console.log(error);
                reject('No se pudo generar el token');
            }
            else{
                resolve(token);
            }
        });
    });
}

export {
    generarJWT
}