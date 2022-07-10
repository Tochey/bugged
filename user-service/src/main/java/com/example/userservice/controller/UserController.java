package com.example.userservice.controller;

import com.example.userservice.model.User;
import com.example.userservice.service.UserService;
import com.example.userservice.vo.ResponseTemplateVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
//@CrossOrigin(origins = "*")
@RequestMapping("/users")
//@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/get/{id}")
    public Optional<User> getUser(@PathVariable int id) {
        return service.getUser(id);
    }

    @GetMapping("/getall")
    public List<User> getAll() {
        return service.getAllUsers();
    }

    @GetMapping("/getusersandissues")
    public List<ResponseTemplateVO> getAllUsersAndIssues(){
            return service.getusersandissues();
    }

    @PostMapping("/create")
    public User create(@RequestBody User user) {
        return service.addUser(user);
    }

    @PutMapping("/update/{id}")
    public Optional<User> updateUser(@PathVariable int id, @RequestBody User user) {
        return service.updateUser(id, user);
    }

//not public
//    @GetMapping("/getusersbyissueid")
//    public List<User> getByIssueId(@RequestParam int issueid){
//        return service.getByIssueId(issueid);
//    }

//    @GetMapping("/updatestatus/{issueid}")
//    public ResponseTemplateVO update(@PathVariable int  issueid, @RequestParam String status){
//        return service.updateIssueStatus(issueid, status );
//    }
//
//    @GetMapping("/assign{userid}{issueid}")
//    public User assign(@RequestParam int userid, @RequestParam int issueid){
//       return  service.assignIssueToUser(userid, issueid);
//    }

//    @GetMapping("/reassign{previousissueid}")
//    public User reassign( @RequestParam int previousissueid){
//        return  service.reassignIssueToUser( previousissueid);
//    }
//
}
