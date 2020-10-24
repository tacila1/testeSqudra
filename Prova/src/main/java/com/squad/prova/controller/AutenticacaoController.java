package com.squad.prova.controller;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.squad.prova.banco.Pessoa;
import com.squad.prova.dto.LoginFormDTO;
import com.squad.prova.dto.PessoaDTO;
import com.squad.prova.repository.PessoaRepository;

@RestController
@RequestMapping("/login")
public class AutenticacaoController {
	
	@Autowired
	private PessoaRepository repository;
	
	@PostMapping
	public ResponseEntity<?> login(@RequestBody @Valid LoginFormDTO form) {
		Optional<Pessoa> op = repository.findBySenhaAndCpf( form.getSenha(),form.getCpf());
		
		if(op.isPresent()) {
			return ResponseEntity.ok(new PessoaDTO(op.get()));
		}else {
			return ResponseEntity.badRequest().build();	
		}
	}
	
	@GetMapping("check")
	public ResponseEntity<?> checkServer(){
		return ResponseEntity.ok().build();
	}

}
