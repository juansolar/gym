import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ɵangular_packages_router_router_n } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Inscripcion } from 'src/app/models/inscripcion';
import { Precio } from 'src/app/models/precio';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {

  inscripcion: Inscripcion = new Inscripcion();
  cliente: Cliente = new Cliente();
  precios: Precio[] = new Array<Precio>();
  precioSeleccionado: Precio = new Precio();
  idPrecio: string = "null"

  constructor(private db: AngularFirestore, private mensajeService: MensajesService) { }

  ngOnInit(): void {
    this.db.collection<Precio>('Precios').get().subscribe(
    (data) =>{
      data.docs.forEach((item) =>{
        let precio = item.data() as Precio;
        precio.id = item.id;
        precio.ref = item.ref;
        this.precios.push(precio);
      })
    }
    )
  }

  asingarCliente(cliente: Cliente){
    console.log(cliente)
    this.inscripcion.cliente = cliente.ref;
    this.cliente = cliente;
  }

  eliminarCliente(){
    this.inscripcion.cliente = undefined;
    this.cliente = new Cliente();
  }

  guardar(){
    if(this.inscripcion.validar().esValido){
      let inscripcioneAgregar = {
        fecha: this.inscripcion.fecha,
        fechaFinal: this.inscripcion.fechaFinal,
        cliente: this.inscripcion.cliente,
        precio: this.inscripcion.precio,
        subTotal: this.inscripcion.subTotal,
        iva: this.inscripcion.iva,
        total: this.inscripcion.total
      }
      this.db.collection("Inscripciones").add(inscripcioneAgregar).then(
        (data) =>{
          this.inscripcion = new Inscripcion();
          this.cliente = new Cliente();
          this.precioSeleccionado = new Precio();
          this.idPrecio = "null"
          this.mensajeService.mensajeCorrecto("Inscrito","Inscripción agregada con exito")
        }
      ).then(()=>{
        this.mensajeService.mensajeError("Error","La inscripción no pudo ser registrada")
      })
    }else
      this.mensajeService.mensajeAdvertencia("Advertencia", this.inscripcion.validar().mensaje)
  }

  seleccionarPrecio(id: string){

    if(id == "null"){
      this.precioSeleccionado = new Precio();
      this.inscripcion.precio = null;
      this.inscripcion.subTotal = 0;
      this.inscripcion.iva = 0;
      this.inscripcion.total = 0;
      this.inscripcion.fecha = null;
      this.inscripcion.fechaFinal = null;
      
    }else{
      this.precioSeleccionado = this.precios.find(x => x.id == id)
      this.inscripcion.precio = this.precioSeleccionado.ref;

      this.inscripcion.fecha = new Date();

      let anio = this.inscripcion.fecha.getFullYear();
      let mes = this.inscripcion.fecha.getMonth();
      let dia = this.inscripcion.fecha.getDate();

      if(this.precioSeleccionado.tipoDuracion == 1){
        //dia
        let dias: number = this.precioSeleccionado.duracion;
        let fechaFinal = new Date(anio,mes,dia + dias)
        this.inscripcion.fechaFinal = fechaFinal;
      }
      if(this.precioSeleccionado.tipoDuracion == 2){
        //semana
        let dias: number = this.precioSeleccionado.duracion * 7;
        let fechaFinal = new Date(anio,mes,dia + dias)
        this.inscripcion.fechaFinal = fechaFinal;
      }
      if(this.precioSeleccionado.tipoDuracion == 3){
        //quincena
        let dias: number = this.precioSeleccionado.duracion * 15;
        let fechaFinal = new Date(anio,mes,dia + dias)
        this.inscripcion.fechaFinal = fechaFinal;
      }
      if(this.precioSeleccionado.tipoDuracion == 4){
        //mes
        let meses: number = this.precioSeleccionado.duracion + mes;
        let fechaFinal = new Date(anio, meses,dia)
        this.inscripcion.fechaFinal = fechaFinal;
      }
      if(this.precioSeleccionado.tipoDuracion == 5){
        //año
        let anios: number = this.precioSeleccionado.duracion + anio;
        let fechaFinal = new Date(anios,mes,dia)
        this.inscripcion.fechaFinal = fechaFinal;
      }

      this.inscripcion.subTotal = this.precioSeleccionado.costo;
      this.inscripcion.iva = this.inscripcion.subTotal * 0.19;
      this.inscripcion.total = this.inscripcion.iva + this.inscripcion.subTotal;

    }
  }

}

