package com.midgard.web.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Statut {

	@Id
	private Long id;
	
	private String statut;
	
	private Boolean statutProjet;
	private Boolean statutPhase;
	private Boolean statutEvent;
	private Boolean statutTache;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getStatut() {
		return statut;
	}
	public void setStatut(String statut) {
		this.statut = statut;
	}
	public Boolean getStatutProjet() {
		return statutProjet;
	}
	public void setStatutProjet(Boolean statutProjet) {
		this.statutProjet = statutProjet;
	}
	public Boolean getStatutPhase() {
		return statutPhase;
	}
	public void setStatutPhase(Boolean statutPhase) {
		this.statutPhase = statutPhase;
	}
	public Boolean getStatutEvent() {
		return statutEvent;
	}
	public void setStatutEvent(Boolean statutEvent) {
		this.statutEvent = statutEvent;
	}
	public Boolean getStatutTache() {
		return statutTache;
	}
	public void setStatutTache(Boolean statutTache) {
		this.statutTache = statutTache;
	}
	
	
	
}
