package ua.kiev.prog;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import ua.kiev.prog.dto.LocationDTO;
import ua.kiev.prog.services.LocationService;

@SpringBootApplication
@EnableCaching
public class SpringGeoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringGeoApplication.class, args);
	}

    @Bean
    public CommandLineRunner commandLineRunner(LocationService locationService) {
        return args -> {
            LocationDTO dto = new LocationDTO("1.2.3.4.5.6" ,"Prague","Central Bohemian Region", "Czech Republic" );
            LocationDTO dto1 = new LocationDTO("1.2.3.4.5.6" ,"Budapest","Central Bohemian Region", "Hungary" );

            locationService.save(dto);locationService.save(dto1);



        };
    }
}
