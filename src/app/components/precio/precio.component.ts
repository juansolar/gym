import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-precio',
  templateUrl: './precio.component.html',
  styleUrls: ['./precio.component.scss']
})
export class PrecioComponent implements OnInit {

  formGroup: FormGroup;
  precios: Array<any> = new Array<any>()
  
  constructor(private fb: FormBuilder, private db: AngularFirestore, private mensajeService: MensajesService) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required]
    })

    this.db.collection("Precios").get().subscribe((data)=>{
      data.docs.forEach((data) =>{
        let precio = data.data();
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
      }
    ).catch( () => {this.mensajeService.mensajeError("Error", "Ocurrio un error en agregar el precio")} )
  }

}
