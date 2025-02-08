package org.dit.wim.ase.footprint.repo;

import org.dit.wim.ase.footprint.entity.Answermodel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface AnswerRepository extends JpaRepository<Answermodel, Integer> {
}