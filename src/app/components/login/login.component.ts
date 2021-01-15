import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formgroup: FormGroup;
  datosCorrectos: boolean = true;
  textoError: string = "";

  constructor(private fb: FormBuilder, public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.formgroup = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.required]
    })
  }

  ingresar(){
    if(this.formgroup.valid){
      this.datosCorrectos = true;
      this.afAuth.signInWithEmailAndPassword(this.formgroup.value.email, this.formgroup.value.password).then(
        (usuario) => {console.log(usuario)}
      ).catch((error)=>{
        this.datosCorrectos = false;
        this.textoError = error.message
      })
    }else{
      this.datosCorrectos = false
      this.textoError = "Por favor revisa que los datos estén correctos";
    }
  }

}
