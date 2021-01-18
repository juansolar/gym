import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, RouterLink } from '@angular/router';
import { MensajesService } from 'src/app/services/mensajes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  formgroup: FormGroup;
  porcentajeSubida: number = 0;
  urlImg: string = "";
  esEditable: boolean = false;
  id: string = ""

  constructor(private fb: FormBuilder, private storage: AngularFireStorage, private db: AngularFirestore,
    private route: ActivatedRoute, private mensajeService: MensajesService) { }

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
    });

    this.id = this.route.snapshot.params.clienteId;

    if(this.id != undefined){
      this.esEditable = true;
      this.db.doc<any>('Cliente/' + this.id).valueChanges().subscribe(
        (cliente) => {
          console.log()
          this.formgroup.setValue({
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            correo: cliente.correo,
            cedula: cliente.cedula,
            fechaNacimiento: new Date(cliente.fechaNacimiento.seconds * 1000).toISOString().substring(0,10),
            telefono: cliente.telefono,
            urlImg: ''
          });
          this.urlImg = cliente.urlImg;
        }
      )
    }


  }

  agregar(){
    this.formgroup.value.urlImg = this.urlImg;
    this.formgroup.value.fechaNacimiento = new Date(this.formgroup.value.fechaNacimiento);
    this.db.collection("Cliente").add(this.formgroup.value).then(
      (data) => {
        this.mensajeService.mensajeCorrecto("Agrego", "Se agrego correctmane")
      }
    ).catch(
      (error) => {console.log(error)}
    )
  }

  editar(){
    this.formgroup.value.urlImg = this.urlImg;
    this.formgroup.value.fechaNacimiento = new Date(this.formgroup.value.fechaNacimiento);
    this.db.doc('Cliente/' + this.id).update(this.formgroup.value).then(
      (data) => {
        this.mensajeService.mensajeCorrecto("Actualizo", "Se actualizo correctamente")
      }
    ).catch(
      (error) => {
        this.mensajeService.mensajeCorrecto("Error", "Ocurrio un error en la actualización")
      }
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
