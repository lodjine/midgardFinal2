package com.midgard.web.dao;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.midgard.web.model.TicketDestinataire;

public interface TicketDestinataireDao extends JpaRepository<TicketDestinataire, Serializable> {
	@Transactional
	@Modifying
	@Query("delete  from TicketDestinataire t where t.id.ticket_iddb_ticket = :x")
	void deleteTacheDestByTicketId(@Param("x") Long ref);
}
