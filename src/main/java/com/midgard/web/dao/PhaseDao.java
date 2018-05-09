package com.midgard.web.dao;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.midgard.web.model.Phase;

public interface PhaseDao extends JpaRepository<Phase, Serializable> {
	@Query("select p from Phase p where p.projet.idProjet like :x")
	List<Phase> getPhaseByProjet(@Param("x") Long ref);

	
	@Query("select ph.idPhase from Phase ph where ph.projet.idProjet  in (select t.projet.idProjet from Ticket t where t.statut.statut = :y and t.idEvenement= null)"
			+ " or ph.idPhase in  (select t.idEvenement.idPhase.idPhase from Ticket t where t.statut.statut = :y ) ")
	List<String> getListTacheProjetNonTraiter(@Param("y") String etat);
}
