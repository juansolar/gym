import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  formgroup: FormGroup;

  constructor(private fb: FormBuilder) { }

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

}
