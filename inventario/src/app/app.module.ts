import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaComponent } from './pages/lista/lista.component';
import { LibroComponent } from './pages/libro/libro.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    LibroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule.withConfig({
      warnOnNgModelWithFormControl: 'never'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
