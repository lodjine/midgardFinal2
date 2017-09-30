package com.midgard.web.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.midgard.web.model.Ticket;

public interface TicketDao extends JpaRepository<Ticket, Long> {

}
