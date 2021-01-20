import { Conjunto } from './conjunto';
import { Perfil } from './perfil';
import { ConjuntoPerfilModulo } from './conjuntoPerfilModulo';
export class ConjuntoPerfil {
    idConjunto: number;
    idPerfil: number;
    conjuntos: Conjunto;
    perfiles: Perfil;
    conjuntoPerfilModulos: ConjuntoPerfilModulo[];
}