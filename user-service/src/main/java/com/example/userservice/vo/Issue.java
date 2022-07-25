package com.example.userservice.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Issue {

    private int issueId;
    private String subject;
    private String description;
    private String lastUpdated;
    private int assignee;
    private Status status;
    private Priority priority;
    private int val;
    private String category;
}
