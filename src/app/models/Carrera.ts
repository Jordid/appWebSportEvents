import { Categoria } from "./Categoria";

export class Carrera {
    idCarrera: number;
    nombre: string;
    descripcion: string;
    idCiudad: number;
    nombreCiudad: string;
    idTipoCarrera: number
    tipoCarreraValor: string;
    distancia: number;
    longitud: number;
    latitud: number;
    fechaInicio: Date;
    fechaFin: Date;
    estado: number;
    creaedAt: Date;
    createdUser: number;
    categorias: Categoria[];

}