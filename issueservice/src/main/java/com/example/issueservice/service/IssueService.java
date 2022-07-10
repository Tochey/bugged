package com.example.issueservice.service;

import com.example.issueservice.model.Issue;
import com.example.issueservice.model.Status;
import com.example.issueservice.repository.IssueRepository;
import com.example.issueservice.vo.ResponseTemplateVO;
import com.example.issueservice.vo.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import reactor.util.annotation.NonNull;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class IssueService {
    IssueRepository repository;

    @Autowired
    RestTemplate template;

    public IssueService(IssueRepository repository) {
        this.repository = repository;
    }

    public Issue getIssue(int id) {
        Optional<Issue> issue = repository.findById(id);
        return issue.get();
    }


    public List<Issue> getAllIssues() {
        return repository.findAll();
    }

    public Issue createIssue(Issue issue) {
        Issue request = new Issue(issue.getSubject(), issue.getDescription(), issue.getAssignee(), issue.getPriority(), issue.getStatus(), issue.getCategory());
        return repository.save(request);
    }

    public ResponseTemplateVO assignIssue(int userId, int issueId) {
        ResponseTemplateVO vo = new ResponseTemplateVO();
        Optional<Issue> issue = repository.findById(issueId);
        User user = template.getForObject("http://USER-SERVICE/users/assign?userid=" + userId + "&issueid=" + issueId, User.class);
        assert user != null;
        issue.get().setAssignee(user.getIssueId());
        repository.save(issue.get());
        vo.setUser(user);
        return vo;

    }

    public Issue updateIssue(int id, @NonNull Issue issue) {
        Optional<Issue> optional = repository.findById(id);


        if (issue.getSubject() != null) {
            optional.get().setSubject(issue.getSubject());
        }

        if (issue.getDescription() != null) {
            optional.get().setDescription(issue.getDescription());
        }
//&& issue.getStatus() != Status.DONE
        if (issue.getStatus() != null )  {
            optional.get().setStatus(issue.getStatus());
        }


       if (issue.getPriority() != null) {
            optional.get().setPriority(issue.getPriority());
        }

       if(issue.getAssignee() != optional.get().getAssignee() && issue.getAssignee() != 0){
           optional.get().setAssignee(issue.getAssignee());
       }

       if(issue.getCategory() != null){
            optional.get().setCategory(issue.getCategory());
        }

        Date dNow = new Date( );
        SimpleDateFormat ft =
                new SimpleDateFormat("hh:mm:ss a");

           optional.get().setLastUpdated(ft.format(dNow));

        repository.save(optional.get());

        return optional.get();
    }

//    public Optional<Issue> updateStatus(int id, String status) {
//
//        Optional<Issue> optionalIssue = repository.findById(id);
//        optionalIssue.get().setStatus(Status.valueOf(status));
//        repository.save(optionalIssue.get());
//        return optionalIssue;
//    }


    public List<Issue> getByStatus(List<String> status) {
        List<List<Issue>> issueList = new ArrayList<>();

        for (String s : status) {
            issueList.add(repository.findAllByStatus(Status.valueOf(s)));
        }

        return issueList.stream().flatMap(List::stream).collect(Collectors.toList());

    }

    public List<Issue> getUsersIssues(int id) {
       return  repository.findAllByAssignee(id);

    }



//    public User[] closeIssue(int issueid) {
//        Optional<Issue> issue = repository.findById(issueid);
//
//        issue.get().setStatus(Status.DONE);
//        repository.save(issue.get());
//
//        //updating user side
//        ResponseEntity<User[]> response = template.getForEntity("http://USER-SERVICE/users/getusersbyissueid?issueid=" + issueid, User[].class);
//        User[] objects = response.getBody();
//
//
//        return objects;
//
//
//    }
}
