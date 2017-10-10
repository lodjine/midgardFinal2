package com.midgard.web.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.midgard.web.model.Ticket;

public interface TicketDao extends JpaRepository<Ticket, Long> {

}
