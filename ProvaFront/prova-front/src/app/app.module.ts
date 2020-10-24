import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PessoaSingleComponent } from './pessoa/pessoa-single/pessoa-single.component';
import { AppRoutingModule } from './app.routing.module';
import { SourcePageComponent } from './source-page/source-page.component';
import { PessoaModule } from './pessoa/pessoa.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    // PessoaSingleComponent,
    LoginComponent,
    SourcePageComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    PessoaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
