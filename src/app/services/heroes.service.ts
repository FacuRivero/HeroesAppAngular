import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private http: HttpClient) {}

  url = 'https://login-app-24970.firebaseio.com';

  crearHeroe(heroe: HeroeModel) {

    return this.http.post(`${this.url}/heroes.json`, heroe)
    .pipe( map( (resp: any) => {
      heroe.id = resp.name;
      return heroe;
    }))
  }

  actualizarHeroe(heroe: HeroeModel) {

    const heroeTempo = {
      ...heroe
    };

    delete heroeTempo.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTempo);

  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
    .pipe( map( resp => {
       delay(1500);
       return this.crearArreglo(resp);
    }))
  }

  private crearArreglo( heroesObj: Object) {

    let heroes: HeroeModel[] = [];

    if (heroesObj === null) {
      return [];
    }

    Object.keys(heroesObj).forEach( key => {

      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    })


    return heroes;
  }

  getHeroe (id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  borrarHeroe(id: string) {
     return this.http.delete(`${this.url}/heroes/${id}.json`);
  }
}
