import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../../../models/cliente';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {

  clientes: Cliente[] = new Array<Cliente>();

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    // this.db.collection('Cliente').valueChanges().subscribe(
    //   (data) => { this.clientes = data }
    // )

    this.clientes.length = 0;
    this.db.collection<Cliente>('Cliente').get().subscribe(
      (data) => {

        data.docs.forEach((item) =>{

          let cliente = item.data();
          cliente.id = item.id;
          cliente.ref = item.ref;
          this.clientes.push(cliente);

        });

      }
    )
  }

}
