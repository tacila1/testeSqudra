package com.squad.prova;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

import springfox.documentation.swagger2.annotations.EnableSwagger2WebMvc;


@SpringBootApplication
@EnableResourceServer
@EnableSwagger2WebMvc
public class ProvaApplication {
    
	public static void main(String[] args) {
		SpringApplication.run(ProvaApplication.class, args);
	}
	

}
