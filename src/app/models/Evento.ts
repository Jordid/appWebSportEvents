import { Carrera } from "./Carrera";
import { Ciudad } from "./Ciudad";

export class Evento {
    idEvento: number;
    nombre: string;
    fechaInicio: Date;
    fechaFin: Date;
    fechaInicioInscripcion: Date;
    fechaFinInscripcion: Date;
    createdAt: Date;
    idFuncional: number;
    urlFotoEvento: string;
    idProvincia: number;
    idCiudad: number;
    estado: number;
    codCatValEstadoEvento: number;
    createdUser: number;
    carreras: Carrera[];
    ciudad: Ciudad;
}