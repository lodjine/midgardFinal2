package com.midgard.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

@SpringBootApplication
public class MidgardProjetApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(MidgardProjetApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(MidgardProjetApplication.class);
	}
}
