package com.example.issueservice.repository;

import com.example.issueservice.model.Issue;
import com.example.issueservice.model.Status;
import com.example.issueservice.vo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Integer> {
  List<Issue> findAllByStatus(Status status);


    List<Issue> findAllByAssignee(int id);
}
