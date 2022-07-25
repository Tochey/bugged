package com.example.issueservice;

import com.example.issueservice.model.Issue;
import com.example.issueservice.model.Priority;
import com.example.issueservice.model.Status;
import com.example.issueservice.repository.IssueRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;


@SpringBootApplication
public class IssueserviceApplication {
    public static void main(String[] args) {
        SpringApplication.run(IssueserviceApplication.class, args);
    }

    @Bean
    public CommandLineRunner loadData(IssueRepository repo) {
//        return (args) -> {
//            String url = "http://localhost:8080/issues/create";
//          //  array of issues
//            Issue[] arr = {
//                    new Issue("This is sent through rest template", "This is a test", 4, Priority.CRITICAL),
//                    new Issue("The api requests arent load balanced", "This was just empty fixed", 3, Priority.NORMAL),
//                    new Issue("I dont like this job", "See me for more info", 2, Priority.IMPORTANT),
//                    new Issue("The cow doesnt sit right on here", "This is a test and is meant to be ignored", 1, Priority.CRITICAL),
//            };
//            // save a couple of Issues
//            for (Issue issue : arr) {
//                HttpEntity<?> request = new HttpEntity<>(issue);
//                ResponseEntity<?> response = new RestTemplate().postForEntity(url, request, String.class);
//            }
//        };

        return (args) -> {
            repo.save(new Issue("Need to migrate from mySQL to mongoDB", "We need to migrate immediately", 1, Priority.CRITICAL, Status.TODO, "Algo"));
            repo.save(new Issue("Issue cards are not aligned on our website, should be a quick fix", "This has been persistent for days", 2, Priority.NORMAL, Status.REVIEW, "Algo"));
            repo.save(new Issue("Issue 2 and this is a test for -- CRITICAL IMPORTANT - INPROGRESS", "Please ignore for now", 3, Priority.IMPORTANT, Status.INPROGRESS, "Algo"));
            repo.save(new Issue("Issue 2 and trhis is also a testing situation", "Please ignore for now just ignore ", 4, Priority.IMPORTANT, Status.INPROGRESS, "Algo"));
        };
    }



    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }


}

