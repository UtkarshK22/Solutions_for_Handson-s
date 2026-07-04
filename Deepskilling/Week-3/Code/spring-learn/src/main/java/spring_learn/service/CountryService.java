package spring_learn.service;

import java.util.List;

import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import spring_learn.Country;

@Service
public class CountryService {

    public Country getCountry(String code) {

        try (ClassPathXmlApplicationContext context =
                new ClassPathXmlApplicationContext("country.xml")) {

            @SuppressWarnings("unchecked")
            List<Country> countries =
                (List<Country>) context.getBean("countryList");

            for (Country country : countries) {

                if (country.getCode().equalsIgnoreCase(code)) {
                    return country;
                }
            }

            return null;
        }
    }
}