class Cliente {
    public cliente_id: number;
    public razon_social: string;
    public telefono: string;
    public correo: string;
    public referencia: string;
    public calle: string;
    public colonia: string;
    public cp: string;
    public ciudad_id: number;
    public estado_id: number;
    public pais_id: number;
    public latitud: number;
    public longitud: number;
    public observaciones: string;
    public fecha_creacion: string;
    public usuario_creacion: number;
    public fecha_modificacion: string;
    public usuario_modificacion: number;

    constructor(
        cliente_id: number,  
        razon_social: string, 
        telefono: string, 
        correo: string, 
        referencia: string,
        calle: string,
        colonia: string,
        cp: string,
        ciudad_id: number,
        estado_id: number,
        pais_id: number,
        latitud: number,
        longitud: number,
        observaciones: string,
        fecha_creacion: string,
        usuario_creacion: number,
        fecha_modificacion: string,
        usuario_modificacion: number
        ){
        this.cliente_id = cliente_id;
        this.razon_social = razon_social;
        this.telefono = telefono;
        this.correo = correo;
        this.referencia = referencia;
        this.calle = calle;
        this.colonia = colonia;
        this.cp = cp;
        this.ciudad_id = ciudad_id;
        this.estado_id = estado_id;
        this.pais_id = pais_id;
        this.latitud = latitud;
        this.longitud = longitud;
        this.observaciones = observaciones;
        this.fecha_creacion = fecha_creacion;
        this.usuario_creacion = usuario_creacion;
        this.fecha_modificacion = fecha_modificacion;
        this.usuario_modificacion = usuario_modificacion;
    }

    // public static ClienteNuevo(
    //     razon_social: string, 
    //     telefono: string, 
    //     correo: string, 
    //     referencia: string,
    //     calle: string,
    //     colonia: string,
    //     cp: string,
    //     ciudad_id: number,
    //     estado_id: number,
    //     pais_id: number,
    //     latitud: number,
    //     longitud: number,
    //     observaciones: string,
    //     fecha_creacion: string,
    //     usuario_creacion: number,
    //     fecha_modificacion: string,
    //     usuario_modificacion: number){

    // }

}

export default Cliente;