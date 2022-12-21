import mysql from 'mysql';

const conn = mysql.createConnection({
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || 'root',
    database: process.env.DATABASE || 'prueba_backend',
    port: 3306 || process.env.DB_PORT
});

export default conn;