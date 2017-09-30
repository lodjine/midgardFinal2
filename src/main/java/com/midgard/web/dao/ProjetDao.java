package com.midgard.web.dao;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;

import com.midgard.web.model.Projet;

public interface ProjetDao extends JpaRepository<Projet, Serializable> {

}
