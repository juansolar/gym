import { DocumentReference } from "@angular/fire/firestore";

export class Cliente{
    id: string;
    nombre: string;
    apellido: string;
    correo: string;
    cedula: string;
    fechaNacimiento: Date;
    telefono: number;
    urlImg: string;
    ref: DocumentReference;
    visible: boolean;

}