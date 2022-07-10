package com.example.issueservice.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity(name = "issue")
@Data
@NoArgsConstructor
public class Issue {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private int issueId;
    @Column(name = "subject")
    private String subject;
    @Column(name = "description " , columnDefinition="TEXT")
    private String description;
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status;
    @Column(name = "priority")
    @Enumerated(EnumType.STRING)
    private Priority priority;
    @Column(name = "lastUpdated")
    private String lastUpdated;

    @Column(name = "timeCreated")
    private String created;
    @Column
    private int assignee;
    @Column
    private int val;
   @Transient
    private static int counter = 12023;
   @Column
   private String category;

    //    private Attachment attachment;


   public Issue(String subject, String description, int assignee, Priority priority, Status status, String category ){
       counter++;
       Date dNow = new Date( );
       SimpleDateFormat ft =
               new SimpleDateFormat("hh:mm:ss a");
       this.created = ft.format(dNow);
       this.lastUpdated = ft.format(dNow);
       this.subject = subject;
       this.description = description;
       this.status = status;
       this.assignee = assignee;
       this.priority = priority;
       this.val = counter;
       this.category = category;

   }
}
