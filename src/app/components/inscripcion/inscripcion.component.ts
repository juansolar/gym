import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Inscripcion } from 'src/app/models/inscripcion';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {

  inscripcion: Inscripcion = new Inscripcion();
  cliente: Cliente = new Cliente();

  constructor() { }

  ngOnInit(): void {
  }

  asingarCliente(cliente: Cliente){
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

}

