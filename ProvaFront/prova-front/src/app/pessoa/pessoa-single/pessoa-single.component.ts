import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { PlatformDetectorService } from '../../core/plataform-detector/platform-detector.service';

import * as $ from 'jquery';
import { PessoaService } from '../pessoa.service';
import { PessoaDTO } from '../model/pessoaDTO';
import { Router } from '@angular/router';
import { validaCpf } from 'src/app/comum/validators/validaCpf';
import { ChatAdapter } from 'ng-chat';
import { ChatPessoasAdapter } from 'src/app/chat/chat-pessoas-adapter';
import { ChatService } from 'src/app/chat/chat.service';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-pessoa-single',
  templateUrl: './pessoa-single.component.html',
  styleUrls: ['./pessoa-single.component.css']
})
export class PessoaSingleComponent implements OnInit {

  public pessoas: PessoaDTO[];
  public temp: Object = false;
  pessoaForm: FormGroup;
  pessoaAlvo: PessoaDTO;
  cpfExistente = false;
  isEditar = false;
  pessoaSemAlteracao: PessoaDTO;
  mostrarMsg = false;
  mensagem = "";
  classM = 'alert-success';
  title;
  userId;

  public adapter: ChatAdapter;

  constructor(private service: PessoaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private chatService: ChatService,
    private authService: AuthService
  ) { 
  }

  ngOnInit(): void {
    let user = this.authService.getUsuarioLogado();
    this.title = user.nome;
    this.userId = user.id;
    this.adapter = new ChatPessoasAdapter(this.service, user);
    this.service.getLista().subscribe(r => {
      this.pessoas = r;
    }, error => {
      
      if (this.service.chamarNovamente(error)) {
        alert("Erro no Servidor ou Servidor fora do ar, recarregue a página");
        this.service.getTokenDoBanco().subscribe(tk => {
        }, errs => {});
      } else {
        alert('Dados Incorretos');
      }
      console.error(error);
    });

    this.contruirForm(null);
  }

  contruirForm(p: PessoaDTO) {
    if (p != null) {
      this.pessoaForm = this.formBuilder.group({
        nome: [p.nome, Validators.required],
        cpf: [p.cpf, [
          Validators.required,
          validaCpf,
        ]],
        email: [p.email, Validators.email],
        sexo: [p.sexo],
        naturalidade: [p.naturalidade],
        nacionalidade: [p.nacionalidade],
        dataNascimento: [this.formatDate(p.dataNascimento), [Validators.pattern(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/),
        Validators.required]],
        senha: ['', Validators.required],
      });

    } else {
      this.pessoaForm = this.formBuilder.group({
        nome: ['', Validators.required],
        cpf: ['', [
          Validators.required,
          validaCpf,
        ]],
        email: ['', Validators.email],
        sexo: [''],
        naturalidade: [''],
        nacionalidade: [''],
        dataNascimento: ['', [Validators.pattern(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/),
        Validators.required]],
        senha: ['', Validators.required],
      });
    }
  }

  formatDate(dt) {
    return dt[2] + '/' + dt[1] + '/' + dt[0];
  }

  salvar() {
    if (this.isEditar == true) {
      this.edita();
      this.isEditar = false;
    } else {
      this.cadastrar();
      this.isEditar = false;
    }

  }

  getPessoaForm() {
    let cpfTratado = this.pessoaForm.get('cpf').value.replace(/\.|\,|-/g, '');
    let pessoa = new PessoaDTO(
      this.pessoaForm.get('nome').value,
      this.pessoaForm.get('sexo').value,
      this.pessoaForm.get('email').value,
      new Date(),
      this.pessoaForm.get('naturalidade').value,
      this.pessoaForm.get('nacionalidade').value,
      cpfTratado,
      this.pessoaForm.get('senha').value,
    );

    return pessoa;
  }

  cadastrar() {

    this.pessoaAlvo = this.getPessoaForm();

    this.service.cadastrar(this.pessoaAlvo)
      .subscribe(r => {
        this.cpfExistente = false;
        this.pessoas.push(r);
        this.pessoaForm.reset();
        this.setarMensagem(false, "Cadastrado com sucesso");
      }, err => {
        if (err?.error?.erro?.indexOf("CPF repetido") != -1) {
          this.cpfExistente = true;
          this.setarMensagem(true, "Erro ao Cadastrar");
        }else{
          if (this.service.chamarNovamente(err)) {
            alert("Erro no Servidor ou Servidor fora do ar, recarregue a página");
            this.service.getTokenDoBanco().subscribe(tk => {
            }, errs => {});
          } else {
            alert('Dados Incorretos');
          }
        }
      });
  }

  editar(p) {
    this.isEditar = true;
    this.pessoaSemAlteracao = p;
    this.contruirForm(p);
  }

  edita() {
    let pessoaEditada = this.getPessoaForm();
    pessoaEditada.id = this.pessoaSemAlteracao.id;

    this.service.atualizar(this.pessoaSemAlteracao.id, pessoaEditada)
      .subscribe(r => {
        let index = this.pessoas.indexOf(this.pessoaSemAlteracao);
        this.pessoas[index] = r;

        this.isEditar = false;
        this.pessoaSemAlteracao = null;

        this.pessoaForm.reset();

        this.setarMensagem(false, "Editado com sucesso");


      }, err => {
        console.error(err);

        this.setarMensagem(true, "Erro ao Editar");
        if (this.service.chamarNovamente(err)) {
          alert("Erro no Servidor ou Servidor fora do ar, recarregue a página");
          this.service.getTokenDoBanco().subscribe(tk => {
          }, errs => {});
        } else {
          alert('Dados Incorretos');
        }

      });

  }

  deletar(p: PessoaDTO) {
    this.service.delete(p.id).subscribe(r => {
      //apagando da tela.
       this.setarMensagem(false, "Deletado com sucesso");
      let index = this.pessoas.indexOf(p);
      this.pessoas.splice(index, 1);

    }, err => { 
      this.setarMensagem(true, "Erro ao Deletar");
      if (this.service.chamarNovamente(err)) {
        alert("Erro no Servidor ou Servidor fora do ar, recarregue a página");
        this.service.getTokenDoBanco().subscribe(tk => {
        }, errs => {});
      } else {
        alert('Dados Incorretos');
      }
      console.error(err) 
    });
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  setarMensagem(isErro, txt) {
    if (isErro) {
      this.classM = 'alert-danger';
    } else {
      this.classM = 'alert-success';
    }

    this.mostrarMsg = true;
    this.mensagem = txt;
  }

}
