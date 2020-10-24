package com.squad.prova.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.squad.prova.banco.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
	Optional<Pessoa> findByCpf(String cpf);

	Optional<Pessoa> findBySenhaAndCpf(String senha, String cpf);
}
