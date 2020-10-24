import { Component, OnInit } from '@angular/core';
import { PessoaService } from './pessoa/pessoa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'prova-front';


  constructor(servicePessoa:PessoaService){
    servicePessoa.getToken();
  }

  ngOnInit(){

  }


}
