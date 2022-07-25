package com.example.userservice.service;

import com.example.userservice.model.User;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.vo.Issue;
import com.example.userservice.vo.ResponseTemplateVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository repository;
    @Autowired
    RestTemplate template;


    public UserService(UserRepository repository) {
        this.repository = repository;
    }


    public Optional<User> getUser(int id) {
        Optional<User> user = repository.findById(id);
        return user;
    }

    public List<User> getAllUsers() {
        return repository.findAll();
    }

    public Optional<User> updateUser(int id, User user) {
        Optional<User> userOptional = repository.findById(id);


        if (userOptional.isPresent()) {
            if (user.getFname() != null) {
                userOptional.get().setFname(user.getFname());
            }
            if (user.getLname() != null) {
                userOptional.get().setLname(user.getLname());
            }
            if (user.getTitle() != null) {
                userOptional.get().setTitle(user.getTitle());
            }
            if(user.getAvatar() != null){
                    userOptional.get().setAvatar(user.getAvatar());
            }

            repository.save(userOptional.get());
        }
        return userOptional;
    }

    public User addUser(User user) {
        User newUser = new User(user.getFname(), user.getLname(), user.getTitle(), user.getAvatar());
        return repository.save(newUser);
    }


    public List<ResponseTemplateVO> getusersandissues(){
        List<ResponseTemplateVO> list = new ArrayList<ResponseTemplateVO>();
        List<User> userList =   repository.findAll();

      for(User u : userList){
          ResponseTemplateVO vo = new ResponseTemplateVO();
         Issue[] response =   template.getForObject("http://ISSUE-SERVICE/issues/getUsersIssues/" + u.getUserId(), Issue[].class);
          assert response != null;
          vo.setUser(u);
          vo.setIssues(Arrays.asList(response));
          list.add(vo);
      }
        return list;
    }

}
