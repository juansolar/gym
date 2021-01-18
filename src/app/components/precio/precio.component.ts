import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Precio } from 'src/app/models/precio';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-precio',
  templateUrl: './precio.component.html',
  styleUrls: ['./precio.component.scss']
})
export class PrecioComponent implements OnInit {

  formGroup: FormGroup;
  precios: Array<Precio> = new Array<Precio>()
  esEditar: boolean = false;
  id: string = ""
  
  constructor(private fb: FormBuilder, private db: AngularFirestore, private mensajeService: MensajesService) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required]
    })

    this.mostrarPrecios();

  }

  mostrarPrecios(){
    this.db.collection<Precio>("Precios").get().subscribe((data)=>{
      this.precios.length = 0;
      data.docs.forEach((data) =>{
        let precio = data.data() as Precio;
        precio.id = data.id;
        precio.ref = data.ref;
        this.precios.push(precio);
      })
    })

  }

  agregar(){
    this.db.collection("Precios").add(this.formGroup.value).then(
      () => { 
        this.mensajeService.mensajeCorrecto("Agregado", "Se agrego correctamente")
        this.formGroup.reset();
        this.mostrarPrecios();
      }
    ).catch( () => {this.mensajeService.mensajeError("Error", "Ocurrio un error en agregar el precio")} )
  }

  editarPrecio(precio: Precio){
    this.esEditar = true;
    this.id = precio.id;
    this.formGroup.setValue({
      nombre: precio.nombre,
      costo: precio.costo,
      duracion: precio.duracion,
      tipoDuracion: precio.tipoDuracion
    })
  }

  editar(){
    this.db.doc("Precios/" + this.id).update(this.formGroup.value).then(
      () => { 
        this.mensajeService.mensajeCorrecto("Actualizado","Precio actualizado correctamente");
        this.formGroup.reset();
        this.esEditar = false;
        this.mostrarPrecios();
    }).catch(
      () => {this.mensajeService.mensajeError("Error", "Ocurrio un error en la actualización")}
    )
  }

}
