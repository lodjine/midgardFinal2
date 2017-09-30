package com.midgard.web.dao;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.midgard.web.model.Tache;

public interface TacheDao extends JpaRepository<Tache, Serializable> {

	@Query("select t from Tache t where t.event.idEvenement like :x")
	List<Tache> getTacheByEvent(@Param("x") Long ref);

}
