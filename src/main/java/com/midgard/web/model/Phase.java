package com.midgard.web.model;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

@Entity
public class Phase {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idphas;
	private String idPhase;
	private String phase;
	private Date dateDebut;
	private Date dateSoldePhase;
	private Date dateFin;
	private String honoraires;
	private boolean archi;
	private boolean grosOeuvre;
	private boolean metal;
	private boolean bois;
	private boolean voirie;
	private Long nbrEvent;
	@ManyToOne
	private Statut statut;
	@ManyToOne(cascade = CascadeType.MERGE)
	private Projet projet;
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "phase_documents", joinColumns = @JoinColumn(name = "idphas"), inverseJoinColumns = @JoinColumn(name = "iddoc"))
	private Set<Document> docs = new HashSet<Document>();
	@ManyToOne
	@JoinColumn(name = "chef_projet_user_id")
	private User chefProjet;

	private String etat;
	private Long delaiHjIng;
	private Long delaiHjTech;

	public Long getId() {
		return idphas;
	}

	public void setId(Long id) {
		this.idphas = id;
	}

	public String getIdPhase() {
		return idPhase;
	}

	public void setIdPhase(String idPhase) {
		this.idPhase = idPhase;
	}

	public String getPhase() {
		return phase;
	}

	public void setPhase(String phase) {
		this.phase = phase;
	}

	public Date getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(Date dateDebut) {
		this.dateDebut = dateDebut;
	}

	public Date getDateSoldePhase() {
		return dateSoldePhase;
	}

	public void setDateSoldePhase(Date dateSoldePhase) {
		this.dateSoldePhase = dateSoldePhase;
	}

	public Date getDateFin() {
		return dateFin;
	}

	public void setDateFin(Date dateFin) {
		this.dateFin = dateFin;
	}

	public String getHonoraires() {
		return honoraires;
	}

	public void setHonoraires(String honoraires) {
		this.honoraires = honoraires;
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

	public User getChefProjet() {
		return chefProjet;
	}

	public void setChefProjet(User chefProjet) {
		this.chefProjet = chefProjet;
	}

	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
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

	public Phase() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Projet getProjet() {
		return projet;
	}

	public void setProjet(Projet projet) {
		this.projet = projet;
	}

	public Set<Document> getDocs() {
		return docs;
	}

	public void setDocs(Set<Document> docs) {
		this.docs = docs;
	}

	public Long getIdphas() {
		return idphas;
	}

	public void setIdphas(Long idphas) {
		this.idphas = idphas;
	}

	public Statut getStatut() {
		return statut;
	}

	public void setStatut(Statut statut) {
		this.statut = statut;
	}

	public Long getNbrEvent() {
		return nbrEvent;
	}

	public void setNbrEvent(Long nbrEvent) {
		this.nbrEvent = nbrEvent;
	}

}
