package com.example.userservice.model;


import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;


@Entity
@NoArgsConstructor
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    @Column(name = "FirstName")
    private String fname;
    @Column(name = "LastName")
    private String lname;

    @Column(name = "title")
    private String title;

    @Column
    private String avatar;

    public User(String fname, String lname, String title, String avatar){

        this.fname = fname;
        this.lname = lname;
        this.title = title;
        this.avatar = avatar;
    }



}
