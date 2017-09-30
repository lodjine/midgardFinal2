package com.midgard.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.midgard.web.dao.StatutDao;
import com.midgard.web.model.Statut;

@RestController
public class StatutService {

	@Autowired
	private StatutDao statutDao;

	@RequestMapping(value = "/statut", method = RequestMethod.POST)
	public Statut saveStatut(@RequestBody Statut statut) {
		statutDao.save(statut);
		return statut;
	}

	@RequestMapping(value = "/statut", method = RequestMethod.PUT)
	public Statut updateStatut(@RequestBody Statut statut) {
		statutDao.save(statut);
		return statut;
	}

	@RequestMapping(value = "/statut", method = RequestMethod.GET)
	public List<Statut> getStatuts() {
		return statutDao.findAll();
	}

	@RequestMapping(value = "/statut/{id}", method = RequestMethod.GET)
	public Statut getStatut(@PathVariable Long id) {
		return statutDao.findOne(id);
	}

	@RequestMapping(value = "/statut/{id}", method = RequestMethod.DELETE)
	public void deleteStatut(@PathVariable Long id) {
		statutDao.delete(id);
	}

}