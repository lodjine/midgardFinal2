package com.midgard.web.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Ticket {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long iddbTicket;
	@OneToOne
	@JoinColumn(name = "idEvenement")
	private Evenement idEvenement;
	@OneToOne
	@JoinColumn(name = "tache")
	private Tache tache;

	@OneToOne
	@JoinColumn(name = "projet")
	private Projet projet;

	@OneToOne
	@JoinColumn(name = "emetteur")
	private User emetteur;


	@ManyToMany
	private Set<User> destinataire = new HashSet<User>();

	@Column(length = 255)
	private String commentaire;


	public String getCommentaire() {
		return commentaire;
	}
	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}
	private String idTicket;
	private String Sujet;
	private Date dateEchance;
	private String priorite;
	@ManyToOne
	private Statut statut;
	
	private String typeTicket;

	public Long getIddbTicket() {
		return iddbTicket;
	}

	public void setIddbTicket(Long iddbTicket) {
		this.iddbTicket = iddbTicket;
	}

	public Evenement getIdEvenement() {
		return idEvenement;
	}

	public void setIdEvenement(Evenement idEvenement) {
		this.idEvenement = idEvenement;
	}

	public Tache getTache() {
		return tache;
	}

	public void setTache(Tache tache) {
		this.tache = tache;
	}

	public String getIdTicket() {
		return idTicket;
	}

	public void setIdTicket(String idTicket) {
		this.idTicket = idTicket;
	}

	public String getSujet() {
		return Sujet;
	}

	public void setSujet(String sujet) {
		Sujet = sujet;
	}

	public Date getDateEchance() {
		return dateEchance;
	}

	public void setDateEchance(Date dateEchance) {
		this.dateEchance = dateEchance;
	}

	public String getPriorite() {
		return priorite;
	}

	public void setPriorite(String priorite) {
		this.priorite = priorite;
	}

	

	public Statut getStatut() {
		return statut;
	}
	public void setStatut(Statut statut) {
		this.statut = statut;
	}
	public Projet getProjet() {
		return projet;
	}

	public void setProjet(Projet projet) {
		this.projet = projet;
	}

	public User getEmetteur() {
		return emetteur;
	}

	public void setEmetteur(User emetteur) {
		this.emetteur = emetteur;
	}

	public Set<User> getDestinataire() {
		return destinataire;
	}

	public void setDestinataire(Set<User> destinataire) {
		this.destinataire = destinataire;
	}

	public String getTypeTicket() {
		return typeTicket;
	}

	public void setTypeTicket(String typeTicket) {
		this.typeTicket = typeTicket;
	}

}
