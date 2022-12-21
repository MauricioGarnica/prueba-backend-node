"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const conn = mysql_1.default.createConnection({
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || 'root',
    database: process.env.DATABASE || 'prueba_backend',
    port: 3306 || process.env.DB_PORT
});
exports.default = conn;
//# sourceMappingURL=connection.js.map