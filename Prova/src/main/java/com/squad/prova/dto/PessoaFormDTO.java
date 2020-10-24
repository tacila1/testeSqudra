package com.squad.prova.dto;

import java.time.LocalDate;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.squad.prova.banco.Pessoa;
import com.squad.prova.banco.Sexo;

public class PessoaFormDTO {
	
	@NotNull @NotEmpty @Length(min = 3)
	private String nome;
	private Sexo sexo;
	private String email;
	@NotNull
	private LocalDate dataNascimento;
	private String naturalidade;
	private String nacionalidade;
	@NotNull
	private String cpf;
	@NotNull
	private String senha;
	
	
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


	public String getSenha() {
		return senha;
	}



	public String getCpf() {
		return cpf;
	}

	public Pessoa convert() {
		return new Pessoa(this.nome, this.sexo,this.email , this.dataNascimento, this.naturalidade, this.nacionalidade, this.cpf, new BCryptPasswordEncoder().encode(this.senha) );
	}
	

}
