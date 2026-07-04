// package spring_learn.controller;

// import org.springframework.context.support.ClassPathXmlApplicationContext;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import spring_learn.Country;

// @RestController
// public class CountryController {

//     @RequestMapping("/country")
//     public Country getCountryIndia() {

//         try (ClassPathXmlApplicationContext context =
//                 new ClassPathXmlApplicationContext("country.xml")) {

//             Country country = context.getBean("country", Country.class);

//             return country;
//         }
//     }
// }


package spring_learn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import spring_learn.Country;
import spring_learn.service.CountryService;

@RestController
public class CountryController {

    @Autowired
    private CountryService countryService;

    @GetMapping("/countries/{code}")
    public Country getCountry(@PathVariable String code) {

        return countryService.getCountry(code);
    }
}