package org.dit.wim.ase.footprint.repo;

import org.dit.wim.ase.footprint.entity.Transportmodel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface TransportRepository extends JpaRepository<Transportmodel, Integer> {

}
