package com.bbsoftware.SportClub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SportClubApplication {

	public static void main(String[] args) {
		SpringApplication.run(SportClubApplication.class, args);
	}

}
