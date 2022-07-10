package com.example.issueservice.controller;

import com.example.issueservice.model.Issue;
import com.example.issueservice.model.Status;
import com.example.issueservice.service.IssueService;
import com.example.issueservice.vo.ResponseTemplateVO;
import com.example.issueservice.vo.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/issues")
public class IssueController {

    @Autowired
    IssueService service;

    public IssueController(IssueService service) {
        this.service = service;
    }

    @GetMapping("/get/{id}")
    public Issue getIssueById(@PathVariable int id) {
        return service.getIssue(id);
    }

    @GetMapping("/getall")
    public List<Issue> getAllIssues() {
        return service.getAllIssues();
    }

    @PostMapping("/create")
    public Issue createIssue(@RequestBody Issue issue) {
        return service.createIssue(issue);
    }

    @PutMapping("/update/{id}")
    public Issue updateIssue(@PathVariable int id, @RequestBody Issue issue) {
        return service.updateIssue(id, issue);
    }

    @GetMapping("/getbystatus")
    public List<Issue> getByStatus(@RequestParam List<String> status ){

        return service.getByStatus(status);
    }

    @GetMapping("getUsersIssues/{id}")
    public List<Issue> getUsersIssues( @PathVariable int id){
        return service.getUsersIssues(id);

    }

    @GetMapping("/assign")
    public ResponseTemplateVO assignIssue(@RequestParam int issue, @RequestParam int user) {
        return service.assignIssue(user, issue);
    }



}
