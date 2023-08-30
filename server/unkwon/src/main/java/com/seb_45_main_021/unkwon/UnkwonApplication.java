package com.seb_45_main_021.unkwon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class UnkwonApplication {
	public static void main(String[] args) {
		SpringApplication.run(UnkwonApplication.class, args);
	}
}
