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

    validar(): any{
        let rta = {
            esValido: false,
            mensaje: ""
        }
        if(this.cliente == null || this.cliente == undefined){
            rta.esValido = false;
            rta.mensaje = "No ha seleccionado un cliente"
            return rta;
        }
        if(this.precio == null || this.precio == undefined){
            rta.esValido = false;
            rta.mensaje = "No ha seleccionado un precio"
            return rta;
        }
        if(this.fecha == null || this.fecha == undefined){
            rta.esValido = false;
            rta.mensaje = "No tiene fecha de inicio"
            return rta;
        }
        if(this.fechaFinal == null || this.fechaFinal == undefined){
            rta.esValido = false;
            rta.mensaje = "No tiene fecha final"
            return rta;
        }
        if(this.subTotal <= 0 || this.subTotal == undefined){
            rta.esValido = false;
            rta.mensaje = "No se ha podido calcular el subtotal"
            return rta;
        }
        if(this.iva <= 0 || this.iva == undefined){
            rta.esValido = false;
            rta.mensaje = "No se ha podido calcular el IVA"
            return rta;
        }
        if(this.total <= 0 || this.total == undefined){
            rta.esValido = false;
            rta.mensaje = "No se ha podido calcular el Total"
            return rta;
        }
        rta.esValido = true
        return rta;
    }

}