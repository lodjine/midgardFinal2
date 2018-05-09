package com.midgard.web.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class HistoriqueETT {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String elementId;

	private String element;

	private String statut;

	private Date date;

	@Column(length = 255)
	private String commentaire;
	
	private String user;

	public HistoriqueETT(String elementId, String element, String statut, Date date, String commentaire,String user) {
		super();
		this.elementId = elementId;
		this.element = element;
		this.statut = statut;
		this.date = date;
		this.commentaire = commentaire;
		this.user = user;
	}

	public HistoriqueETT() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

	public String getElementId() {
		return elementId;
	}

	public void setElementId(String elementId) {
		this.elementId = elementId;
	}

	public String getElement() {
		return element;
	}

	public void setElement(String element) {
		this.element = element;
	}

	public String getStatut() {
		return statut;
	}

	public void setStatut(String statut) {
		this.statut = statut;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

}
