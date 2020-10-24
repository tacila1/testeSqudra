package com.squad.prova.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import com.squad.prova.banco.Pessoa;
import com.squad.prova.banco.Sexo;

public class PessoaDTO {
	
	private Long id;
	private String nome;
	private Sexo sexo;
	private String email;
	private LocalDate dataNascimento;
	private String Naturalidade;
	private String Nacionalidade;
	private String cpf;
	
	
	public PessoaDTO(Pessoa pessoa) {
		this.id = pessoa.getId();
		this.nome = pessoa.getNome();
		this.sexo = pessoa.getSexo();
		this.email = pessoa.getEmail();
		this.dataNascimento = pessoa.getDataNascimento();
		Naturalidade = pessoa.getNaturalidade();
		Nacionalidade = pessoa.getNacionalidade();
		this.cpf = pessoa.getCpf();
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
		return Naturalidade;
	}
	public String getNacionalidade() {
		return Nacionalidade;
	}
	
	public Long getId() {
		return id;
	}

	public String getCpf() {
		return cpf;
	}

	public static List<PessoaDTO> convert(List<Pessoa> pessoas) {
		return pessoas.stream().map(PessoaDTO::new).collect(Collectors.toList());
	}

	
	
}
