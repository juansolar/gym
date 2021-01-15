import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {

  usuario: firebase.User;

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.afAuth.user.subscribe( (data) =>{
      this.usuario = data;
    }
  )
  }

  logout() {
    this.afAuth.signOut();
  }

}
