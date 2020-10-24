package com.squad.prova.security;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableWebMvc
public class SegurancaRecursoConfig extends ResourceServerConfigurerAdapter   {
	
	 @Override
	    public void configure(HttpSecurity http) throws Exception {
	                http
	                .requestMatchers()
	                .and()
	                .authorizeRequests()
	                .antMatchers("/actuator/**", "/api-docs/**").permitAll()
	                .antMatchers("/api/**" ).authenticated();
	    }
}
