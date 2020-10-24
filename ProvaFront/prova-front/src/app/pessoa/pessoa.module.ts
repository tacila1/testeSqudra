import { NgModule } from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidacaoMessageModule } from '../comum/validacaomessage/validacaomessage.module';
import { RouterModule } from '@angular/router';
import { PessoaSingleComponent } from './pessoa-single/pessoa-single.component';
import {NgChatModule} from 'ng-chat'

@NgModule({
    declarations: [ PessoaSingleComponent ],
    imports: [ 
        CommonModule, 
        ReactiveFormsModule,
        ValidacaoMessageModule,
        RouterModule,
        NgChatModule
    ]
})
export class PessoaModule { }