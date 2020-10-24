package com.squad.prova.dto;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public class LoginFormDTO {


	private String cpf;
	private String senha;

	public String getCpf() {
		return cpf;
	}

	public String getSenha() {
		return senha;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public UsernamePasswordAuthenticationToken converter() {
		return new UsernamePasswordAuthenticationToken(cpf, senha);
	}

	
}
