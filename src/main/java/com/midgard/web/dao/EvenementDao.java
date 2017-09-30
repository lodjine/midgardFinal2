package com.midgard.web.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.midgard.web.model.Evenement;

public interface EvenementDao extends JpaRepository<Evenement, Long> {

}
