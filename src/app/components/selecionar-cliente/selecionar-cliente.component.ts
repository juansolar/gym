import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-selecionar-cliente',
  templateUrl: './selecionar-cliente.component.html',
  styleUrls: ['./selecionar-cliente.component.scss']
})
export class SelecionarClienteComponent implements OnInit {

  clientes: Cliente[] = new Array<Cliente>();
  @Input('nombre') nombre: string = "";

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
          cliente.visible = false;
        })
        console.log(this.clientes)
      }
    )
  }

  buscarClientes(event){
    let nombre = event.target.value;
    this.clientes.forEach((cliente)=>{
      if(cliente.nombre.toLocaleLowerCase().includes(nombre.toLocaleLowerCase())){
        cliente.visible = true;
      }else{
        cliente.visible = false
      }
    })
  }

  seleccionarCliente(cliente: Cliente){
    this.nombre = `${cliente.nombre} ${cliente.apellido}` 
    this.clientes.forEach((cliente) =>{
      cliente.visible = false;
    })
  }

  cancelarCliente(){
    this.nombre = undefined;
  }

}
