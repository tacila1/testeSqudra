package com.squad.prova.validacao;

public class ErroFormulario {

	private String tipo;
	private String erro;
	
	public ErroFormulario(String tipo, String erro) {
		this.tipo = tipo;
		this.erro = erro;
	}
	
	public String getTipo() {
		return tipo;
	}
	public String getErro() {
		return erro;
	}
	
	
}
