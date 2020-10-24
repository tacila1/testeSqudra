import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PessoaService } from '../pessoa/pessoa.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router, private authService: AuthService,
    private service: PessoaService) { }

  loginForm: FormGroup;

  ngOnInit(): void {

    this.service.isTokenValido().subscribe(r => { }, err => {
      this.service.getTokenDoBanco().subscribe(tk => {
      }, err => {
        alert("Servidor fora do ar")
      });
    })


    this.loginForm = this.formBuilder.group({
      cpf: ['26486888032', Validators.required],
      senha: ['123', Validators.required]
    });
  }

  login() {

    let cpf = this.loginForm.get('cpf').value.replace(/\.|\,|-/g, '');
    let senha = this.loginForm.get('senha').value;

    this.authService.autenticacao(cpf, senha)
      .subscribe(res => {
        if (res) {
          this.router.navigate(['pessoas']);
        }
      }, err => {
        if (this.service.chamarNovamente(err)) {
          alert("Erro no Servidor ou Servidor fora do ar, recarregue a página");
          this.service.getTokenDoBanco().subscribe(tk => {
          }, errs => {
          });
        } else {
          alert('Dados Incorretos');
        }
      });

  }
}
