import mysql from 'mysql2';

/* Estas lineas de código son para trabajar de manera local */
 const conn = mysql.createConnection({
     host: process.env.HOST || 'localhost',
     user: process.env.USER || 'root',
     password: process.env.PASSWORD || 'root',
     database: process.env.DATABASE || 'prueba_backend',
     port: 3306 || process.env.DB_PORT
 });

// /* Esta línea de conexión es para trabajar en la nube con el respaldo de la BD */
// const conn = mysql.createConnection('mysql://root:8pe0pnds2igppQotX8CR@containers-us-west-188.railway.app:6522/railway');

export default conn;