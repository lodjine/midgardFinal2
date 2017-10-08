package com.midgard.web.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.midgard.web.model.Evenement;

public interface EvenementDao extends JpaRepository<Evenement, Long> {

	@Query("select e.delaiHjIng from Evenement e where e.idEvenement like :x")
	Long getheurIng(@Param("x") Long ref);

	@Query("select e.delaiHjTech from Evenement e where e.idEvenement like :x")
	Long getheurTech(@Param("x") Long ref);

	@Query("select e.delaiHjIng from Evenement e where e.idEvenement like :x")
	Long getheurIngCumul(@Param("x") Long ref);

	@Query("select e.delaiHjTech from Evenement e where e.idEvenement like :x")
	Long getheurTechCumul(@Param("x") Long ref);

	@Query("select e from Evenement e where e.idPhase.projet.idbd = :x")
	List<Evenement> getEventByProjet(@Param("x") Long id);
}
