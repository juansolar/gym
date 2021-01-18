import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-selecionar-cliente',
  templateUrl: './selecionar-cliente.component.html',
  styleUrls: ['./selecionar-cliente.component.scss']
})
export class SelecionarClienteComponent implements OnInit {

  clientes: Cliente[] = new Array<Cliente>();

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection<any>('Cliente').get().subscribe(
      (resultado) => {
        this.clientes.length = 0;
        resultado.docs.forEach((item) =>{
          let cliente: any = item.data();
          cliente.id = item.id;
          cliente.ref = item.ref;
          this.clientes.push(cliente)
        })
        console.log(this.clientes)
      }
    )
  }

}
