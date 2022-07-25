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
        return (args) -> {
            repo.save(new Issue("Need to migrate from mySQL to mongoDB", "We need to migrate immediately", 1, Priority.CRITICAL, Status.TODO, "Feature"));
            repo.save(new Issue("Issue cards are not aligned on our website, should be a quick fix", "This has been persistent for days", 2, Priority.NORMAL, Status.REVIEW, "Issue"));
            repo.save(new Issue("Unit testing needed for user-service microservice. Need to be done by EOD", "Add description here. Needed for more detail", 3, Priority.IMPORTANT, Status.INPROGRESS, "Issue"));
            repo.save(new Issue("Connection to mySQL randomly disconnects. Data is not lost", "Take a look at the sql website for tips", 4, Priority.IMPORTANT, Status.DONE, "Bug"));
            repo.save(new Issue("Look into making client side files type safe with Typescript", "Typescript is the best", 5, Priority.NORMAL, Status.INPROGRESS, "Feature"));
        };
    }



    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }


}

