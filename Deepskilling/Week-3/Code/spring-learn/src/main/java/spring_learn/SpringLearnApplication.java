package spring_learn;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootApplication
public class SpringLearnApplication {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(SpringLearnApplication.class);

    public static void main(String[] args) {

        LOGGER.info("Starting Spring Application");

        SpringApplication.run(SpringLearnApplication.class, args);

        LOGGER.info("Application Started Successfully");

        // Display country details from Spring XML configuration
        // displayCountry();
    }

    public static void displayCountry() {

    try (ClassPathXmlApplicationContext context =
            new ClassPathXmlApplicationContext("country.xml")) {

        Country country = context.getBean("country", Country.class);

        LOGGER.debug("Country : {}", country.toString());
    }
}
}