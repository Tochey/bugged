package com.example.userservice.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class IssueList {
    private List<Issue> issues;


    private IssueList (){
        issues = new ArrayList<>();
    }
}
