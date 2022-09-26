import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Libros } from 'src/app/models/libros.models';
import { InventarioService } from 'src/app/service/inventario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styles: [
  ]
})
export class LibroComponent  {

  cargando: boolean = false;

  validarFormulario: FormGroup = this.fb.group({
    titulo: [, [Validators.required] ],
    autor: [,],
    apublicacion: [,],
    editorial: [,],
    categoria: [,],
    sede: [,]
  })

  id: string = '';
  detallesLibro: any = {};

  constructor(private route: ActivatedRoute, private fb:FormBuilder, private inventarioService: InventarioService, private router:Router) { 

    //Obtener el parametro de la ruta
    route.params.subscribe( parametro => {
      console.log(parametro);
      inventarioService.detallesLibro( parametro['id'] ).subscribe( (resp: any) => {
        this.id =  parametro['id'];
        this.detallesLibro = resp.libro;
      }, (error) => {
        console.log(error);
      })
    })
  }
  


  editarLibro() {
    if( !this.validarFormulario.valid ){
      this.validarFormulario.markAllAsTouched();
      return;
    }

    const libro: Libros = {
      titulo: this.validarFormulario.value.titulo,
      autor: this.validarFormulario.value.autor,
      apublicacion: this.validarFormulario.value.apublicacion,
      editorial: this.validarFormulario.value.editorial,
      categoria: this.validarFormulario.value.categoria,
      sede: this.validarFormulario.value.sede,
      _id: this.id
    }

    this.inventarioService.editarLibro(libro)
    .subscribe(resp => {
      this.router.navigateByUrl('/lists');
      this.cargando = false;
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Algo salio mal',
        timer: 2000
      })
      console.error(error.error);
    })
  }

  eliminarLibro(id: any) {
    this.inventarioService.deleteLibro(id)
    .subscribe( resp => {
      setTimeout( function(){

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Libro eliminado',
          timer: 1500
        })
      }, 1500);
      this.router.navigateByUrl('/lists');
    }, (error) => { console.log(error)});
  }
}
