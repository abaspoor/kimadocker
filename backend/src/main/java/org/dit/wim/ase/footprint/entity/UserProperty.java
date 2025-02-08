package org.dit.wim.ase.footprint.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;

@Entity
@Table(name="UserProperty")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserProperty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="User_Id")
    private Integer User_id;
    @Column(name="UserName",unique = true)
    private String username;
    @Column(name="PassWord")
    private String password;
    @Column(name="EmaiL",unique = true)
    private String email;
    @Column(name="FirstName")
    private String Firstname;
    @Column(name="LastName")
    private String Lastname;
    @Column(name="Admin",nullable = false)
    private Boolean admin=false;
    @OneToMany(mappedBy = "userproperty", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Answermodel> Answers;

    @PrePersist
    protected void prePersist() {
        if (admin == null) {
            admin = false;
        }
    }
}
