package com.midgard.web.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Entrepise {

	
	
	@Id
	private Long id;
	private String nom;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public Entrepise() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
