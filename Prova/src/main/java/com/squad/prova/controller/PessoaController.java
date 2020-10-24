package com.squad.prova.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.squad.prova.banco.Pessoa;
import com.squad.prova.dto.PessoaAtualizarFormDTO;
import com.squad.prova.dto.PessoaDTO;
import com.squad.prova.dto.PessoaFormDTO;
import com.squad.prova.repository.PessoaRepository;
import com.squad.prova.validacao.ErroFormulario;

@RestController
@RequestMapping("/pessoa")
public class PessoaController {

	@Autowired
	private PessoaRepository repository;

	@GetMapping
	  public List<PessoaDTO> lista() {
	    List<Pessoa> pessoas = this.repository.findAll();
	    return PessoaDTO.convert(pessoas);
	  }

	@PostMapping
	@Transactional
	public ResponseEntity<?> cadastrar(@RequestBody @Valid PessoaFormDTO pessoa, UriComponentsBuilder uri) {
		Optional<Pessoa> op = repository.findByCpf(pessoa.getCpf());
		if (op.isPresent()) {
			return new ResponseEntity<>(new ErroFormulario("CPF", "CPF repetido"), HttpStatus.CONFLICT);
		} else {
			Pessoa p = pessoa.convert();
			repository.save(p);
			URI uriGo = uri.path("/pessoa/{id}").buildAndExpand(p.getId()).toUri();
			return ResponseEntity.created(uriGo).body(new PessoaDTO(p));
		}
	}

	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<PessoaDTO> atualizar(@PathVariable Long id,
			@RequestBody @Valid PessoaAtualizarFormDTO pessoa) {
		Optional op = repository.findById(id);
		if (op.isPresent()) {
			Pessoa pessoaAtualizada = pessoa.atualizar(id, repository);
			return ResponseEntity.ok(new PessoaDTO(pessoaAtualizada));
		}

		return ResponseEntity.notFound().build();

	}

	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> remover(@PathVariable Long id) {
		Optional<Pessoa> optional = repository.findById(id);
		if (optional.isPresent()) {
			repository.deleteById(id);
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}

}
