import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Guarda } from './login/guarda';
import { GuardaLogin } from './login/guardaLogin';
import { LoginComponent } from './login/login.component';
import { PessoaSingleComponent } from './pessoa/pessoa-single/pessoa-single.component';
import { SourcePageComponent } from './source-page/source-page.component';


const routes: Routes = [
    {
        path: 'pessoas',
        component: PessoaSingleComponent,
        canActivate: [Guarda]
        
    },
    {
        path: '',
        component: LoginComponent,
        canActivate: [GuardaLogin]
    },
    {
        path: 'source',
        component: SourcePageComponent,
    },
    {
        path: '**',
        component: PessoaSingleComponent,
        canActivate: [Guarda]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }

