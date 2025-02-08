package org.dit.wim.ase.footprint.DTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserListDTO {
    public String username;
    public String firstname;
    public String lastname;
    public String email;
    public boolean admin;
}
