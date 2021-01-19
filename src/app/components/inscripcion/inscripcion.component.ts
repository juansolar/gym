import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from 'src/app/models/cliente';
import { Inscripcion } from 'src/app/models/inscripcion';
import { Precio } from 'src/app/models/precio';

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

  constructor(private db: AngularFirestore) { }

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
    console.log(this.inscripcion);
  }

  seleccionarPrecio(id: string){
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

