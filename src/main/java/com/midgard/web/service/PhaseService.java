package com.midgard.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.midgard.web.dao.PhaseDao;
import com.midgard.web.dao.ProjetDao;
import com.midgard.web.model.Phase;
import com.midgard.web.model.Projet;
import com.midgard.web.model.Statut;

@RestController
public class PhaseService {
	@Autowired
	PhaseDao phaseDao;
	@Autowired
	ProjetDao projetDao;

	@RequestMapping(value = "/phase", method = RequestMethod.POST)
	public Phase savePhase(@RequestBody Phase phase) {
		phaseDao.save(phase);
		return phase;
	}

	@RequestMapping(value = "/phase", method = RequestMethod.PUT)
	public Phase updatePhase(@RequestBody Phase phase) {
		phaseDao.save(phase);
		return phase;
	}

	@RequestMapping(value = "/phase", method = RequestMethod.GET)
	public List<Phase> getPhases() {
		return phaseDao.findAll();
	}

	@RequestMapping(value = "/phase/{id}", method = RequestMethod.GET)
	public Phase getPhase(@PathVariable Long id) {
		return phaseDao.findOne(id);
	}

	@RequestMapping(value = "/phase/{id}", method = RequestMethod.DELETE)
	public void deletePhase(@PathVariable Long id) {
		phaseDao.delete(id);
	}

	@RequestMapping(value = "/getByIdProjet/{id}", method = RequestMethod.GET)
	public List<Phase> getByIdProjet(@PathVariable Long id) {
		return phaseDao.getPhaseByProjet(id);
	}

	public boolean saveRecurcive(Phase phase) {
		if (phase.getProjet() != null && phase.getProjet().getIdbd() != null) {
			phaseDao.save(phase);
			return true;
		} else
			return false;
	}

	@RequestMapping(value = "/savePhaseAux", method = RequestMethod.POST)
	public Phase savePhaseAux(@RequestBody Phase phase) {

		Projet projet = projetDao.getProjetByIdFunct(phase.getProjet().getIdProjet());
		long idProjet = phase.getProjet().getIdProjet();
		phase.setProjet(projet);

		boolean test = false;
		while (!test) {
			projet = projetDao.getProjetByIdFunct(idProjet);
			Statut statut = new Statut();
			statut.setId(1L);

			phase.setStatut(statut);
			phase.setProjet(projet);
			test = saveRecurcive(phase);

		}

		return phase;
	}

	
}
