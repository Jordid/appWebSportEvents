import { Provincia } from "./Provincia";

export class Ciudad {
    idCiudad: number;
    nombre: string;
    estado: number;
    idProvincia: number;
    provincia: Provincia;
}