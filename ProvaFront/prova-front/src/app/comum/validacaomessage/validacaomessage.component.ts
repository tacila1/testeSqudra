import { Component, Input } from '@angular/core';

@Component({
    selector: 'ap-vmessage',
    templateUrl: './validacaomessage.component.html'
})
export class ValidacaoMessageComponent {

    @Input() text = '';
 }