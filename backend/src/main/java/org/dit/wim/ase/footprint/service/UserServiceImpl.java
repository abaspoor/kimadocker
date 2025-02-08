package org.dit.wim.ase.footprint.service;

import org.dit.wim.ase.footprint.DTO.UserListDTO;
import org.dit.wim.ase.footprint.entity.Transportmodel;
import org.dit.wim.ase.footprint.security.JwtUtil;
import org.dit.wim.ase.footprint.DTO.UserLoginDTO;
import org.dit.wim.ase.footprint.entity.UserProperty;
import org.dit.wim.ase.footprint.model.UserPropertyResponse;
import org.dit.wim.ase.footprint.repo.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.extern.log4j.Log4j2;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }
    @Override
    public List<UserPropertyResponse> getAllUsers(){
        log.info("Fetching All Users");
        //Fetch Users
        List<UserProperty> userPropertyList = userRepository.findAll();
        List<UserPropertyResponse> userPropertyResponseList =userPropertyList.stream()
                .map(this::convertToUserPropertyResponse)
                .collect(Collectors.toList());
        log.info("Fetched ALl Users");
        return userPropertyResponseList;
    }

    @Override
    public UserPropertyResponse getUserById(Integer User_Id) {
        log.info("Fetching User By Id: {}",User_Id);
        UserProperty userProperty=userRepository.findById(User_Id)
                .orElseThrow(()->new RuntimeException("User with given doesnt exists"));
        UserPropertyResponse userPropertyResponse= convertToUserPropertyResponse(userProperty);
        log.info("Fetched User by id: {}",User_Id);
        return userPropertyResponse;
    }

    @Override
    public UserProperty addUser(UserProperty user) {
        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            throw new RuntimeException("User with this username or email already exists.");
        }
        // Encrypt password before saving
        String hashedPassword = passwordEncoder.encode(user.getPassword());

        log.info("request came");
        // Create user object
        UserProperty newUser = UserProperty.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .password(hashedPassword)
                .Firstname(user.getFirstname())
                .Lastname(user.getLastname())
                .build();
        return userRepository.save(newUser);
    }
    @Override
    public Map<String, Serializable> authenticateUser(UserLoginDTO userDTO){
            Optional<UserProperty> userOptional = userRepository.findByUsername(userDTO.getUsername());
            if(userOptional.isPresent()){
                UserProperty User = userOptional.get();
                if(passwordEncoder.matches(userDTO.getPassword(),User.getPassword())){
                    String token = jwtUtil.generateToken(userDTO.getUsername());
                    String lastname = User.getLastname();
                    Integer id = User.getUser_id();
                    Boolean admin = User.getAdmin();
                    return Map.of("token", token, "lastname", lastname,"id",id,"admin",admin);
                }
            }
            return null;
    }

    @Override
    public List<UserPropertyResponse> getAdmins() {
        log.info("Fetching All Admins");
        //Fetch Users
        List<UserProperty> userPropertyList = userRepository.findByAdmin();
        List<UserPropertyResponse> userPropertyResponseList =userPropertyList.stream()
                .map(this::convertToAdminUserPropertyResponse)
                .collect(Collectors.toList());
        log.info("Fetched ALl Admins");
        return userPropertyResponseList;
    }

    @Override
    public List<UserListDTO> getUsersforAdmin() {
        log.info("Fetching All Users");
        //Fetch Users
        List<UserProperty> userPropertyList = userRepository.findAll();
        List<UserListDTO> userListDTOS =userPropertyList.stream()
                .map(this::convertToUserforAdminPropertyResponse)
                .collect(Collectors.toList());
        log.info("Fetched ALl Users");
        return userListDTOS;
    }

    @Override
    public Map<String, String> setUserforAdmin(UserListDTO userListDTO) {
        log.info("Updating admin status for user: " + userListDTO.getUsername());

        try {
            Optional<UserProperty> userOptional = userRepository.findByUsername(userListDTO.getUsername());

            if (userOptional.isPresent()) {
                UserProperty user = userOptional.get(); // ✅ Retrieve user object
                user.setAdmin(userListDTO.isAdmin());  // ✅ Set new admin status
                userRepository.save(user);  // ✅ Persist changes

                return Map.of("message", "User updated as " + (user.getAdmin() ? "admin" : "not admin"));
            } else {
                return Map.of("error", "User not found");
            }
        } catch (Exception e) {
            log.error("Error setting user as admin: " + e.getMessage());
            return Map.of("error", "Failed to update user as admin");
        }
    }


    @Override
    public Map<String, String> deleteUser(Integer T_Id) {
        log.info("Request to delete User with ID: " + T_Id);

        if (!userRepository.existsById(T_Id)) {
            log.warn("User not found.");
            return Map.of("error", "User not found.");
        }

        UserProperty user = userRepository.findById(T_Id).orElseThrow();

        if (!user.getAnswers().isEmpty()) {
            log.warn("Cannot delete user with ID " + T_Id + " because it has linked answers.");
            return Map.of("error", "Cannot delete: User is linked to existing answers.");
        }

        userRepository.deleteById(T_Id);
        log.info("User deleted successfully.");

        return Map.of("message", "User deleted successfully.");
    }

    @Override
    public Map<String, String> deleteUserCascade(Integer T_Id) {
        log.info("Request to cascade delete User with ID: " + T_Id);

        if (!userRepository.existsById(T_Id)) {
            log.warn("User not found.");
            return Map.of("error", "User not found.");
        }

        userRepository.deleteById(T_Id);
        log.info("user and linked answers deleted successfully.");

        return Map.of("message", "User and all linked answers deleted successfully.");
    }

    @Override
    public Map<String, String> deleteUserAndKeepAnswers(Integer T_Id) {
        log.info("Request to delete User with ID: " + T_Id + " but keep answers.");

        if (!userRepository.existsById(T_Id)) {
            log.warn("User not found.");
            return Map.of("error", "User not found.");
        }

        UserProperty User = userRepository.findById(T_Id).orElseThrow();

        // Set transport reference in linked answers to NULL
        User.getAnswers().forEach(answer -> answer.setUserproperty(null));

        userRepository.deleteById(T_Id);

        log.info("User deleted, but linked answers were kept.");
        return Map.of("message", "User deleted, but linked answers were kept.");
    }

    private UserPropertyResponse convertToUserPropertyResponse(UserProperty userProperty){
        return UserPropertyResponse.builder()
                .User_id(userProperty.getUser_id())
                .Username(userProperty.getUsername())
                .Password(userProperty.getPassword())
                .Email(userProperty.getEmail())
                .Firstname(userProperty.getUsername())
                .Lastname(userProperty.getLastname())
                .admin(userProperty.getAdmin())
                .build();
    }

    private UserPropertyResponse convertToAdminUserPropertyResponse(UserProperty userProperty){
        return UserPropertyResponse.builder()
                .User_id(userProperty.getUser_id())
                .Username(userProperty.getUsername())
                .Password(userProperty.getPassword())
                .Email(userProperty.getEmail())
                .Firstname(userProperty.getUsername())
                .Lastname(userProperty.getLastname())
                .admin(userProperty.getAdmin())
                .build();
    }

    private UserListDTO convertToUserforAdminPropertyResponse(UserProperty userProperty){
        return UserListDTO.builder()
                .username(userProperty.getUsername())
                .firstname(userProperty.getFirstname())
                .lastname(userProperty.getLastname())
                .email(userProperty.getEmail())
                .admin(userProperty.getAdmin())
                .build();
    }
}
