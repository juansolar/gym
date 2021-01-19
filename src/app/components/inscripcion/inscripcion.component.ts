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

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection<Precio>('Precios').get().subscribe(
    (data) =>{
      data.docs.forEach((item) =>{
        let precio = item.data();
        precio.id = item.id;
        precio.ref = precio.ref;
        this.precios.push(precio);
      })
    }
    )
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

