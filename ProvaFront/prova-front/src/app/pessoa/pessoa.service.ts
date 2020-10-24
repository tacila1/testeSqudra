
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PessoaDTO } from './model/pessoaDTO';
import { tap } from 'rxjs/operators';


const CACHE_TOKEN = 'token';

const URL_BASE = 'http://localhost:7177/';

@Injectable({ providedIn: "root" })
export class PessoaService {



    constructor(private _http: HttpClient) {
        // this.getLista()
        //     .subscribe(result => { console.log(result) },
        //         err => {
        //             if(this.chamarNovamente(err)){
        //                 this.getLista()
        //                     .subscribe(result => { console.log(result) },
        //                         err2 => {console.log(err2)});
        //             }
        //         });

        // this.cadastrar(null).subscribe(result=>{
        //     console.log(result)
        // }, 
        // err=> {console.log(err)});

        // this.atualizar(0, null).subscribe(re => { console.log('r ', re) });
        // this.delete(0).subscribe(re => { console.log('r ', re) });
        // if(!this.getToken()){
        //     console.log('não tem token');
        //     this.getTokenDoBanco().subscribe(tk=>{
        //         this.salvarToken(tk);
        //     });
        // }

        // this.isTokenValido().subscribe(r => { }, err => {
        //     this.getTokenDoBanco().subscribe(tk => {
        //       this.salvarToken(tk);
        //     }, err => {
        //       alert("Servidor fora do ar")
        //     });
        //   })

    }

    chamarNovamente(err) {
        console.log(err)
        if (err.status != 400 && err?.error?.error?.indexOf('invalid_token') != -1) {
            // console.error(err.error.error.indexOf('invalid_token'));
            console.error(err)
            this.limparToken();
            return true
        }
        return false;
    }


    getTokenDoBanco() {
        const headers = {
            'Authorization': "Basic cHJvdmE6MTIz"
        }
        return this._http.post(URL_BASE+'oauth/token?grant_type=client_credentials', null, { headers }).pipe(tap(tk=>{this.salvarToken(tk)}));
    }

    getToken() {
        return sessionStorage.getItem(CACHE_TOKEN);
    }

   
    limparToken() {
        sessionStorage.setItem(CACHE_TOKEN, "");
    }

    salvarToken(data) {
        if (data) {
            sessionStorage.setItem(CACHE_TOKEN, data.access_token);
        }
    }

    getHeaders() {
        return {
            "Authorization": "Bearer " + this.getToken(),
            "Content-Type": "application/json",
            "grant_type": "client_credentials"
        };
    }

    getLista() {
        let options = {
            headers: this.getHeaders()
        };

        return this._http.get<PessoaDTO[]>(URL_BASE+"pessoa", options);
    }

    cadastrar(dto: PessoaDTO) {

        let options = {
            headers: this.getHeaders()
        };
        return this._http.post(URL_BASE+"pessoa", dto, options);
    }

    atualizar(id: number, dto: PessoaDTO) {
        let options = {
            headers: this.getHeaders()
        };

        return this._http.put(URL_BASE+"pessoa/" + id, dto, options);
    }

    delete(id:number){
        let options = {
            headers: this.getHeaders()
        };
        return this._http.delete(URL_BASE+"pessoa/" + id, options);
    }

    isTokenValido(){
        let options = {
            headers: this.getHeaders()
        };
        let url=URL_BASE+'login/check';

        return this._http.post(url, null, options);
    }

}