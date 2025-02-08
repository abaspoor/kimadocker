package org.dit.wim.ase.footprint.service;

import org.dit.wim.ase.footprint.DTO.UserListDTO;
import org.dit.wim.ase.footprint.DTO.UserLoginDTO;
import org.dit.wim.ase.footprint.entity.UserProperty;
import org.dit.wim.ase.footprint.model.UserPropertyResponse;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface UserService {
    List<UserPropertyResponse> getAllUsers();
    UserPropertyResponse getUserById(Integer User_Id);
    UserProperty addUser(UserProperty user);
    Map<String, Serializable> authenticateUser(UserLoginDTO user);
    List<UserPropertyResponse> getAdmins();
    List<UserListDTO> getUsersforAdmin();
    Map<String,String> setUserforAdmin(UserListDTO userListDTO);
    Map<String, String> deleteUser(Integer T_Id);
    Map<String, String> deleteUserCascade(Integer T_Id);
    Map<String, String> deleteUserAndKeepAnswers(Integer T_Id);

}
