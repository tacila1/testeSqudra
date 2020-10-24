import {
    ChatAdapter, Message, ChatParticipantStatus,
    ChatParticipantType, IChatParticipant,
    ParticipantResponse, Group
} from 'ng-chat';
import { Observable, of, Subject } from 'rxjs';
import { delay, catchError, map } from "rxjs/operators";
import { PessoaService } from '../pessoa/pessoa.service';
import { PessoaDTO } from '../pessoa/model/pessoaDTO';



export class ChatPessoasAdapter extends ChatAdapter {

    private pessoas: PessoaDTO[];
    private listaPerticipantes: IChatParticipant[] = [];

    webSocket: WebSocket;
    url: string;
    chatHistorico = [];


    constructor(private service: PessoaService, private user) {
        super();
        this.url = "ws://localhost:7177/chat?access_token=" + this.service.getToken() + '&id=' + user.id;
        this.initializeConnection();
    }

    private initializeConnection(): void {

        this.openConnection();
    }

    public openConnection() {
        this.webSocket = new WebSocket(this.url);

        this.webSocket.onopen = (event) => {
            console.log('conexão estabelecida', event);
        }

        this.webSocket.onmessage = (event) => {

            let messageDTO = JSON.parse(event.data);
            let user = this.listaPerticipantes.find(x => x.id == messageDTO.fromId);
            this.onMessageReceived(user, messageDTO);
            this.populaHistorico(messageDTO.toId, messageDTO);
        }

        this.webSocket.onclose = (event) => {
            console.log('conexão encerrada', event);
        }
    }


    populaHistorico(iduser, message) {
        let histUser = this.chatHistorico.find(h => h.id == iduser);
        if (!histUser) {
            let hist = { id: iduser, historico: [message] };
            this.chatHistorico.push(hist);

        } else {
            let index = this.chatHistorico.indexOf(histUser);
            histUser.historico.push(message);

            this.chatHistorico[index] = { id: iduser, historico: histUser.historico };

        }
    }




    public sendMessageWS(message: Message) {
        this.populaHistorico(message.toId, message)
        this.webSocket.send(JSON.stringify(message));
    }

    public closeWebSoketWS() {
        this.webSocket.close();
    }


    listFriends(): Observable<ParticipantResponse[]> {

        return this.carregarParticipantes().pipe(map((res: any) => {
            let arr: ParticipantResponse[] = [];
            res.map(p => {
                if (p.id != this.user.id) {
                    let participantResponse = new ParticipantResponse();
                    participantResponse.participant = p;
                    participantResponse.metadata = {
                        totalUnreadMessages: 0
                    }
                    arr.push(participantResponse);
                }
            })
            return arr;
        }), catchError((error: any) => Observable.throw(error.error || 'Server error')));
    }

    carregarParticipantes(): Observable<IChatParticipant[]> {
        let participantes: IChatParticipant[] = [];

        return new Observable(ob => {

            return this.service.getLista().subscribe(ps => {
                ps.forEach(p => {
                    this.listaPerticipantes.push({
                        participantType: ChatParticipantType.User,
                        id: p.id,
                        displayName: p.nome,
                        avatar: "../assets/imgs/avatar.jpg",
                        status: ChatParticipantStatus.Online
                    })
                });
                ob.next(this.listaPerticipantes);
            }, err => {
                console.error(err);
                ob.error(err);
            });
        })
    }


    getMessageHistory(destinataryId: any): Observable<import("ng-chat").Message[]> {
        let historicosPorUser = this.chatHistorico.find(h => h.id == destinataryId);
        if (historicosPorUser) {
            return of(historicosPorUser.historico);
        } else {
            return of([]);
        }
    }

    sendMessage(message: Message): void {

        this.sendMessageWS(message);
    }

    public onFriendsListChanged(participantsResponse: ParticipantResponse[]): void {
    }


    groupCreated(group: Group): void {

        this.listaPerticipantes.push(group);

        this.listaPerticipantes.sort((first, second) =>
            second.displayName > first.displayName ? -1 : 1
        );

        this.listFriends().subscribe(response => {
            this.onFriendsListChanged(response);
        });
    }


}