package com.midgard.web.dao;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.midgard.web.model.Projet;
import com.midgard.web.model.Tache;

public interface ProjetDao extends JpaRepository<Projet, Serializable> {
	@Query("select t from Projet t where t.idProjet = :x")
	List<Projet> getProjetByIdFunct(@Param("x") Long ref);
	
	

}
