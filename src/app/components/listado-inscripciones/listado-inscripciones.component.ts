import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Inscripcion } from 'src/app/models/inscripcion';

@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.scss']
})
export class ListadoInscripcionesComponent implements OnInit {

  inscripciones: Inscripcion[] = new Array<Inscripcion>();

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.inscripciones.length = 0;
    this.db.collection('Inscripciones').get().subscribe(
      (data) => {
        data.forEach((item)=>{
          let inscripcion = item.data() as Inscripcion;
          inscripcion.id = item.id;

          this.db.doc(item.data().cliente.path).get().subscribe(
            (cliente) =>{
              inscripcion.cliente = cliente.data();
              inscripcion.fecha = new Date(inscripcion.fecha.seconds * 1000)
              inscripcion.fechaFinal = new Date(inscripcion.fechaFinal.seconds * 1000)
              this.inscripciones.push(inscripcion);
              console.log(inscripcion)
            }
          )
          
        })
      })
  }

}
