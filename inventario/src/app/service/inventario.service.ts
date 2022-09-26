import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ObtenerLibros } from '../interface/obtenerLibros.interfaces';
import { map } from 'rxjs/operators';
import { Libros } from '../models/libros.models';

const url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }

  //Crear libro
  crearLibro(libros: any) {
    return this.http.post<Libros>(`${url}/lists`, libros);
  }

  //Obtener lista de libros
  getLibros() {
    return this.http.get<ObtenerLibros>(`${url}/lists`)
    .pipe(
      map( resp => resp.libros )
    );
  }

  //Obtener detalles del libro
  detallesLibro(id: string) {
    return this.http.get(`${url}/lists/${id}`);
  }
  
  //Editar libro
  editarLibro(libro: any) {
    return this.http.put(`${url}/lists/${libro._id}`, libro );
  }

  //Eliminar libro
  deleteLibro(id: string) {
    return this.http.delete(`${url}/lists/${id}`);
  }

}
