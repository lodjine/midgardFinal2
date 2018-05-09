package com.midgard.web.model;

import java.sql.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

@Entity
public class Evenement {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idEvenement;
	@OneToOne
	@JoinColumn(name = "idPhase")
	private Phase idPhase;

	private Long delaiHjIng;
	private Long delaiHjTech;
	private Long delaiHjIngCumul;
	private Long delaiHjTechCumul;
	private String idEvent;
	private String docAtransm;

	private String etat;

	private String etatAvcmt;

	private String quantificationDelai;

	private Date dateDebut;

	private Date echeance;

	private Date dateFin;

	private String priorite;

	private Boolean plans;
	private Boolean noteCalcul;
	private Boolean quantitif;
	private Boolean modele3d;
	private Boolean rapport;

	private Long nbTaches;
	
	private Long etatAvancement;
	
	private boolean archi;
	private boolean grosOeuvre;
	private boolean metal;
	private boolean bois;
	private boolean voirie;

	@ManyToOne
	private Statut statut;
	
	private Boolean ticketNonTraite;
	
	@Column(length = 255)
	private String commentaire;
	@Transient
	private List<HistoriqueETT> historique;


	public String getCommentaire() {
		return commentaire;
	}
	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

	public Long getIdEvenement() {
		return idEvenement;
	}

	public void setIdEvenement(Long idEvenement) {
		this.idEvenement = idEvenement;
	}

	public Phase getIdPhase() {
		return idPhase;
	}

	public void setIdPhase(Phase idPhase) {
		this.idPhase = idPhase;
	}

	public String getDocAtransm() {
		return docAtransm;
	}

	public void setDocAtransm(String docAtransm) {
		this.docAtransm = docAtransm;
	}

	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}

	public String getEtatAvcmt() {
		return etatAvcmt;
	}

	public void setEtatAvcmt(String etatAvcmt) {
		this.etatAvcmt = etatAvcmt;
	}

	public String getQuantificationDelai() {
		return quantificationDelai;
	}

	public void setQuantificationDelai(String quantificationDelai) {
		this.quantificationDelai = quantificationDelai;
	}

	public Date getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(Date dateDebut) {
		this.dateDebut = dateDebut;
	}

	public Date getEcheance() {
		return echeance;
	}

	public void setEcheance(Date echeance) {
		this.echeance = echeance;
	}

	public Date getDateFin() {
		return dateFin;
	}

	public void setDateFin(Date dateFin) {
		this.dateFin = dateFin;
	}

	public String getPriorite() {
		return priorite;
	}

	public void setPriorite(String priorite) {
		this.priorite = priorite;
	}

	public Boolean getPlans() {
		return plans;
	}

	public void setPlans(Boolean plans) {
		this.plans = plans;
	}

	public Boolean getNoteCalcul() {
		return noteCalcul;
	}

	public void setNoteCalcul(Boolean noteCalcul) {
		this.noteCalcul = noteCalcul;
	}

	public Boolean getQuantitif() {
		return quantitif;
	}

	public void setQuantitif(Boolean quantitif) {
		this.quantitif = quantitif;
	}

	public Boolean getModele3d() {
		return modele3d;
	}

	public void setModele3d(Boolean modele3d) {
		this.modele3d = modele3d;
	}

	public Boolean getRapport() {
		return rapport;
	}

	public void setRapport(Boolean rapport) {
		this.rapport = rapport;
	}

	public Statut getStatut() {
		return statut;
	}

	public void setStatut(Statut statut) {
		this.statut = statut;
	}

	public String getIdEvent() {
		return idEvent;
	}

	public void setIdEvent(String idEvent) {
		this.idEvent = idEvent;
	}

	public Long getNbTaches() {
		return nbTaches;
	}

	public void setNbTaches(Long nbTaches) {
		this.nbTaches = nbTaches;
	}

	public Long getDelaiHjIng() {
		return delaiHjIng;
	}

	public void setDelaiHjIng(Long delaiHjIng) {
		this.delaiHjIng = delaiHjIng;
	}

	public Long getDelaiHjTech() {
		return delaiHjTech;
	}

	public void setDelaiHjTech(Long delaiHjTech) {
		this.delaiHjTech = delaiHjTech;
	}

	public Long getDelaiHjIngCumul() {
		return delaiHjIngCumul;
	}

	public void setDelaiHjIngCumul(Long delaiHjIngCumul) {
		this.delaiHjIngCumul = delaiHjIngCumul;
	}

	public Long getDelaiHjTechCumul() {
		return delaiHjTechCumul;
	}

	public void setDelaiHjTechCumul(Long delaiHjTechCumul) {
		this.delaiHjTechCumul = delaiHjTechCumul;
	}

	public Long getEtatAvancement() {
		return etatAvancement;
	}

	public void setEtatAvancement(Long etatAvancement) {
		this.etatAvancement = etatAvancement;
	}

	public boolean isArchi() {
		return archi;
	}

	public void setArchi(boolean archi) {
		this.archi = archi;
	}

	public boolean isGrosOeuvre() {
		return grosOeuvre;
	}

	public void setGrosOeuvre(boolean grosOeuvre) {
		this.grosOeuvre = grosOeuvre;
	}

	public boolean isMetal() {
		return metal;
	}

	public void setMetal(boolean metal) {
		this.metal = metal;
	}

	public boolean isBois() {
		return bois;
	}

	public void setBois(boolean bois) {
		this.bois = bois;
	}

	public boolean isVoirie() {
		return voirie;
	}

	public void setVoirie(boolean voirie) {
		this.voirie = voirie;
	}

	public Boolean getTicketNonTraite() {
		return ticketNonTraite;
	}

	public void setTicketNonTraite(Boolean ticketNonTraite) {
		this.ticketNonTraite = ticketNonTraite;
	}
	public List<HistoriqueETT> getHistorique() {
		return historique;
	}
	public void setHistorique(List<HistoriqueETT> historique) {
		this.historique = historique;
	}

	
	
}
