package org.dit.wim.ase.footprint.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserPropertyResponse {
    private Integer User_id;
    private String Username;
    private String Password;
    private String Email;
    private String Firstname;
    private String Lastname;
    private Boolean admin;

}
