import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  formgroup: FormGroup;
  porcentajeSubida: number = 0;
  urlImg: string = "";

  constructor(private fb: FormBuilder, private storage: AngularFireStorage, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.formgroup = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      cedula: [''],
      fechaNacimiento: ['',Validators.required],
      telefono: [''],
      urlImg: ['', Validators.required]
    })
  }

  agregar(){
    this.formgroup.value.urlImg = this.urlImg;
    this.formgroup.value.fechaNacimiento = new Date(this.formgroup.value.fechaNacimiento);
    this.db.collection("Cliente").add(this.formgroup.value).then(
      (data) => console.log("Termino.")
    )
  }

  subirArchivo(event){
    if(event.target.files.length > 0){
      let archivo = event.target.files[0];
      let ruta = 'clientes/' + event.target.files[0].name
      const referencia = this.storage.ref(ruta);
      const tarea = referencia.put(archivo);
      tarea.then((data)=>{
        console.log(data);
        referencia.getDownloadURL().subscribe((data)=>{
          this.urlImg = data;
        });
      });
      tarea.percentageChanges().subscribe((porcentaje)=>{
        this.porcentajeSubida = parseInt(porcentaje.toString());
      });
    }
    
  }

}
