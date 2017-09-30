package com.midgard.web.dao;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;

import com.midgard.web.model.Document;

public interface DocumentDao extends JpaRepository<Document, Serializable>{

}
