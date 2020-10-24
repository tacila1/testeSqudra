package com.squad.prova.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.squad.prova.banco.Pessoa;
import com.squad.prova.banco.Sexo;
import com.squad.prova.repository.PessoaRepository;

public class PessoaAtualizarFormDTO {
	
	private String nome;
	private Sexo sexo;
	private String email;
	private LocalDate dataNascimento;
	private String naturalidade;
	private String nacionalidade;
	private String senha;
	
	
	public String getSenha() {
		return senha;
	}
	public String getNome() {
		return nome;
	}
	public Sexo getSexo() {
		return sexo;
	}
	public String getEmail() {
		return email;
	}
	public LocalDate getDataNascimento() {
		return dataNascimento;
	}
	public String getNaturalidade() {
		return naturalidade;
	}
	public String getNacionalidade() {
		return nacionalidade;
	}

	public Pessoa convert(String cpfV) {
		return new Pessoa(this.nome, this.sexo,this.email , this.dataNascimento, this.naturalidade, this.nacionalidade, cpfV, this.senha );
	}
	public Pessoa atualizar(Long id, PessoaRepository repository) {
		Pessoa pessoa = repository.getOne(id);
		
		pessoa.setNome(this.nome);
		pessoa.setEmail(this.email);
		pessoa.setDataNascimento(this.dataNascimento);
		pessoa.setNacionalidade(this.nacionalidade);
		pessoa.setNaturalidade(this.naturalidade);
		pessoa.setSexo(this.sexo);;;
		pessoa.setSenha(this.senha);
		pessoa.setDataAlteracao(LocalDateTime.now());
		
		return pessoa;
	}
	
}
