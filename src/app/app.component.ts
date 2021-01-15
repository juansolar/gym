import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gym';
  usuario: firebase.User;
  cargando: boolean = true;

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.user.subscribe((
      data) =>{
        this.cargando = false;
        this.usuario = data;
    })
  }

  login() {
    this.afAuth.signInWithEmailAndPassword("juansolar@gmail.com","123456")
  }
  logout() {
    this.afAuth.signOut();
  }
}
