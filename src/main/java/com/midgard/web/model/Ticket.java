package com.midgard.web.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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
	private String idTicket;
	private String Sujet;
	private Date dateEchance;
	private String priorite;
	private String etat;

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

	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}
}
