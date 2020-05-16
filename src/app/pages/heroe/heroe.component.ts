import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit {
  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService,
              private router: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');
    
    if (id!=='nuevo') {
      this.heroesService.getHeroe(id)
      .subscribe( (resp: HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      })
    }
  }

  guardar(f: NgForm) {

    if ( f.invalid ) {
      console.log("form invalid");
      return;
    }


  Swal.fire('Espere', 'Guardando informacion', 'info');

  Swal.showLoading();

  let peticion: Observable<any>;

    if (this.heroe.id ){
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe(resp => {
      Swal.fire(this.heroe.nombre, 'Se actualizo correctamente', 'success');
    });



  }
}
