package com.midgard.web.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.midgard.web.model.HistoriqueETT;

public interface HistoriqueDao extends JpaRepository<HistoriqueETT, Long> {
	@Query("select h from HistoriqueETT h  where h.elementId like   CONCAT('%',:x,'%')  ")
	List<HistoriqueETT> getByElementId(@Param("x")String elementId);

}
