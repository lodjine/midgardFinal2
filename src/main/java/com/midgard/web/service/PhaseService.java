package com.midgard.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.midgard.web.dao.PhaseDao;
import com.midgard.web.model.Phase;

@RestController
public class PhaseService {
	@Autowired
	PhaseDao phaseDao;

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
}
