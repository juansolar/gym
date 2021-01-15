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
    this.afAuth.signInWithEmailAndPassword(this.formgroup.value.email, this.formgroup.value.password).then(
      (usuario) => {console.log(usuario)}
    )
  }

}
