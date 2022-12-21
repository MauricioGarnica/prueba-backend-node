/* La clase del cliente que contiene los atributos de la base de datos */
class Cliente {
    public razon_social: string;
    public telefono: string;
    public correo: string;
    public referencia: string;
    public calle: string;
    public colonia: string;
    public cp: string;
    public ciudad_id: number;
    public estado_id: number;
    public latitud: number;
    public longitud: number;
    public fecha_creacion: string;
    public usuario_creacion: number;

    constructor(
        razon_social: string, 
        telefono: string, 
        correo: string, 
        referencia: string,
        calle: string,
        colonia: string,
        cp: string,
        ciudad_id: number,
        estado_id: number,
        latitud: number,
        longitud: number,
        fecha_creacion: string,
        usuario_creacion: number,
        ){
        this.razon_social = razon_social;
        this.telefono = telefono;
        this.correo = correo;
        this.referencia = referencia;
        this.calle = calle;
        this.colonia = colonia;
        this.cp = cp;
        this.ciudad_id = ciudad_id;
        this.estado_id = estado_id;
        this.latitud = latitud;
        this.longitud = longitud;
        this.fecha_creacion = fecha_creacion;
        this.usuario_creacion = usuario_creacion;
    }
}

/* Exportamos la clase del cliente */
export default Cliente;