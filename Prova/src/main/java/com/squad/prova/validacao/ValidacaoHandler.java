package com.squad.prova.validacao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ValidacaoHandler {

	@Autowired
	private MessageSource message;
	
	@ResponseStatus(code = HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public List<ErroFormulario> handler(MethodArgumentNotValidException ex){
		List<ErroFormulario> erros = new ArrayList<>();
		
		List<FieldError> fildsErrors = ex.getBindingResult().getFieldErrors();
		
		fildsErrors.forEach(e -> {
			String mensagem = message.getMessage(e, LocaleContextHolder.getLocale());
			ErroFormulario erro = new ErroFormulario(e.getField(), mensagem);
			erros.add(erro);
		});
		
		return erros;
	}
	
}
