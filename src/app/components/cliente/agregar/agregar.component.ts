import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
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

  constructor(private fb: FormBuilder, private storage: AngularFireStorage) { }

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
    console.log(this.formgroup.value)
  }

  subirArchivo(event){
    let archivo = event.target.files[0];
    let ruta = 'clientes/' + event.target.files[0].name
    const referencia = this.storage.ref(ruta);
    const tarea = referencia.put(archivo);
    tarea.then((data)=>{
      console.log(data);
      referencia.getDownloadURL().subscribe((data)=>{
        console.log(data);
      });
    });
    tarea.percentageChanges().subscribe((porcentaje)=>{
      this.porcentajeSubida = parseInt(porcentaje.toString());
    });
  }

}
