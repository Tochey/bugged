package com.example.userservice;

import com.example.userservice.model.Role;
import com.example.userservice.model.User;
import com.example.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class UserserviceApplication {
    public static final Role ADMIN = Role.ADMIN;
    public static final Role USER = Role.USER;
    @Autowired
    UserRepository repository;

    public UserserviceApplication(UserRepository repository) {
        this.repository = repository;
    }

    public static void main(String[] args) {
        SpringApplication.run(UserserviceApplication.class, args);
    }

    @Bean
    public CommandLineRunner loadData(UserRepository repository) {
        return (args) -> {
            // save a couple of Employees
                repository.save(new User("Ashley", "Jones", "Senior Software Engineer","https://robohash.org/eossitaspernatur.png?size=50x50&set=set1"));
                repository.save(new User("Cordae", "Waterway", "Junior Software Engineer", "https://robohash.org/doloresestratione.png?size=50x50&set=set1"));
                repository.save(new User("Jennifer", "Diamati", "Software Engineer intern", "https://robohash.org/consequunturculpaaccusamus.png?size=50x50&set=set1"));
                repository.save(new User("James", "Bondi", "Frontend Engineer", "https://robohash.org/officiasintmollitia.png?size=50x50&set=set1"));
                repository.save(new User("Tochi", "Don", "DevOps Engineer", "https://robohash.org/quasetrepudiandae.png?size=50x50&set=set1"));

        };
    }

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }

}
