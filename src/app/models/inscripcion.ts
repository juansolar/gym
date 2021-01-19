import { DocumentReference } from "@angular/fire/firestore";

export class Inscripcion{
    fecha: Date;
    fechaFinal: Date;
    cliente: DocumentReference;
    precio: DocumentReference;
    subTotal: number;
    iva: number;
    total: number;

    constructor(){
        this.fecha = null;
        this.fechaFinal = null;
        this.cliente = this.cliente
        this.precio = this.precio;
        this.subTotal = this.subTotal;
        this.iva = this.iva;
        this.total = this.total

    }
}