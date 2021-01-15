import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {

  clientes: any[] = new Array<any>();

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    // this.db.collection('Cliente').valueChanges().subscribe(
    //   (data) => { this.clientes = data }
    // )

    this.clientes.length = 0;
    this.db.collection('Cliente').get().subscribe(
      (data) => {
        console.log(data.docs)

        data.docs.forEach((item) =>{
          console.log(item.id)
          console.log(item.data())

          let cliente = item.data();
          // cliente.id = item.id;
          // cliente.ref = item.ref;
          this.clientes.push(cliente);

        });

      }
    )
  }

}
