package com.example.userservice.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.ArrayList;
import java.util.List;

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


}
