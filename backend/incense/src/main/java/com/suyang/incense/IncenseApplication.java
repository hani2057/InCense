package com.suyang.incense;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
@EnableJpaAuditing
public class IncenseApplication {


	public static void main(String[] args) {
		SpringApplication.run(IncenseApplication.class, args);
	}


}
