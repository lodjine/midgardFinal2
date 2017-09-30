package com.midgard.web.dao;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.midgard.web.model.Phase;

public interface PhaseDao extends JpaRepository<Phase, Serializable> {
	@Query("select p from Phase p where p.projet.idbd like :x")
	List<Phase> getPhaseByProjet(@Param("x") Long ref);
}
