import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Libros } from 'src/app/models/libros.models';
import { InventarioService } from 'src/app/service/inventario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {

  cargando: boolean = false;

  validarFormulario: FormGroup = this.fb.group({
    titulo: [,],
    autor: [,],
    apublicacion: [,],
    editorial: [,],
    categoria: [,],
    sede: [,]
  })

  listadeLibros: any = [];

  constructor(
    private fb: FormBuilder,
    private inventarioService: InventarioService) { 
    this.getLibros();
  }

  ngOnInit(): void {
  }

  crearLibro() {
    console.log(this.validarFormulario.value);
    this.inventarioService.crearLibro(this.validarFormulario.value)
    .subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: 'Libro agregado con éxito',
        timer: 2000
      })
      console.log(resp);
      this.getLibros();
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Llenar todos los campos',
        timer: 2000
      })
      console.error(error.error);
    })
  }

  getLibros() {
    this.cargando = true;
    this.inventarioService.getLibros()
    .subscribe( (resp: Libros) => {
      this.listadeLibros = resp;
      console.log(this.listadeLibros);
      this.cargando = false;
    }, (error) => {
      console.error(error);
    })
  }
}
