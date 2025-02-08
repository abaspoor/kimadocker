package org.dit.wim.ase.footprint.repo;

import org.dit.wim.ase.footprint.entity.UserProperty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserProperty, Integer> {
    @Query("SELECT u FROM UserProperty u WHERE u.email = :email")
    Optional<UserProperty> findByEmail(String email); // self-made method
    @Query("SELECT u FROM UserProperty u WHERE u.username = :username")
    Optional<UserProperty> findByUsername(String username); // self-made method
    @Query("SELECT u FROM UserProperty u WHERE u.admin = true")
    List<UserProperty> findByAdmin(); // self-made method
}
