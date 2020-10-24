import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { PessoaService } from '../pessoa/pessoa.service';

const CHAVE_USER = 'user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private pessoaService: PessoaService) { }


    autenticacao(cpf: string, senha: string) {

        let url = 'http://localhost:7177/login';
        let form = { 'cpf': cpf, 'senha': senha };
        let options = {
            headers: this.pessoaService.getHeaders()
        };


        return this.http.post(url,form,options).pipe(tap(res=>{
            this.salvarUserLocal(res);
        }))
    }

    salvarUserLocal(user){
        let userDTO = {'id': user.id, 'nome': user.nome};
        sessionStorage.setItem(CHAVE_USER, JSON.stringify(userDTO));
    }

    logout(){
        sessionStorage.removeItem(CHAVE_USER);
    }

    getUsuarioLogado(){
        return JSON.parse(sessionStorage.getItem(CHAVE_USER));
    }

    hasUser(){
        return !!sessionStorage.getItem(CHAVE_USER);
    }

}