import { Injectable } from '@angular/core'
import { Message } from 'ng-chat';
import { PessoaService } from '../pessoa/pessoa.service';
import { ChatPessoasAdapter } from './chat-pessoas-adapter';


@Injectable({ providedIn: "root" })
export class ChatService {

    constructor(private service: PessoaService) { }

    // webSocket: WebSocket;
    // url: string = "ws://localhost:7177/chat?access_token=" + this.service.getToken();
    // chatHistorico = [];

    // public openConnection() {
    //     // let u = 'ws://localhost:7177/chat?access_token='+this.service.getToken();

    //     this.webSocket = new WebSocket(this.url);

    //     this.webSocket.onopen = (event) => {
    //         console.log('conexão estabelecida', event);
    //     }

    //     this.webSocket.onmessage = (event) => {
    //         console.log('dentro do onmessage', event);

    //         let messageDTO = JSON.parse(event.data);
    //         // this.adapter.onMessageReceived(null,messageDTO );
    //         this.chatHistorico.push(messageDTO);

    //     }

    //     this.webSocket.onclose = (event) => {
    //         console.log('conexão encerrada', event);
    //         this.service.limparToken();
    //     }
    // }





    // public sendMessage(message: Message) {
    //     console.log('dentro de sendMessage WebSocket ', message);
    //     this.webSocket.send(JSON.stringify(message));
    // }

    // public closeWebSoket() {
    //     console.log('fechando conexão');
    //     this.webSocket.close();
    // }


}