package com.midgard.web.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.engine.internal.Cascade;

@Entity
public class Tache {
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Long idBd;
@Column(unique=true)
private String idTache;

private String description;
private Long hjIng;
private Long hjTech;
@ManyToOne
private User operateur;

private Long etatAavancement;
@ManyToOne
private Statut statut;

@ManyToOne
private Evenement event;


@ManyToOne(cascade = CascadeType.ALL)
@JoinColumn(nullable = true)
private Tache tacheLie;

private Boolean avantTache;

private Boolean apresTache;

private Long delaiEntreTache;


public Long getIdBd() {
	return idBd;
}
public void setIdBd(Long idBd) {
	this.idBd = idBd;
}
public String getIdTache() {
	return idTache;
}
public void setIdTache(String idTache) {
	this.idTache = idTache;
}
public String getDescription() {
	return description;
}
public void setDescription(String description) {
	this.description = description;
}
public User getOperateur() {
	return operateur;
}
public void setOperateur(User operateur) {
	this.operateur = operateur;
}
public Long getEtatAavancement() {
	return etatAavancement;
}
public void setEtatAavancement(Long etatAavancement) {
	this.etatAavancement = etatAavancement;
}
public Statut getStatut() {
	return statut;
}
public void setStatut(Statut statut) {
	this.statut = statut;
}
public Evenement getEvent() {
	return event;
}
public void setEvent(Evenement event) {
	this.event = event;
}
public Long getHjIng() {
	return hjIng;
}
public void setHjIng(Long hjIng) {
	this.hjIng = hjIng;
}
public Long getHjTech() {
	return hjTech;
}
public void setHjTech(Long hjTech) {
	this.hjTech = hjTech;
}
public Tache getTacheLie() {
	return tacheLie;
}
public void setTacheLie(Tache tacheLie) {
	this.tacheLie = tacheLie;
}
public Boolean getAvantTache() {
	return avantTache;
}
public void setAvantTache(Boolean avantTache) {
	this.avantTache = avantTache;
}
public Boolean getApresTache() {
	return apresTache;
}
public void setApresTache(Boolean apresTache) {
	this.apresTache = apresTache;
}
public Long getDelaiEntreTache() {
	return delaiEntreTache;
}
public void setDelaiEntreTache(Long delaiEntreTache) {
	this.delaiEntreTache = delaiEntreTache;
}


}
