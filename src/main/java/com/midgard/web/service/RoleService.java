package com.midgard.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.midgard.web.dao.RoleDao;
import com.midgard.web.model.Role;

@RestController
public class RoleService {
	@Autowired
	private RoleDao RoleDao;

	@RequestMapping(value = "/midgard/role", method = RequestMethod.POST)
	public Role saveRole(@RequestBody Role role) {
		RoleDao.save(role);
		return role;
	}

	@RequestMapping(value = "/midgard/role", method = RequestMethod.PUT)
	public Role updateRole(@RequestBody Role role) {
		RoleDao.save(role);
		return role;
	}

	@RequestMapping(value = "/midgard/role", method = RequestMethod.GET)
	public List<Role> getRoles() {
		return RoleDao.findAll();
	}

	@RequestMapping(value = "/midgard/role/{id}", method = RequestMethod.GET)
	public Role getRole(@PathVariable Long id) {
		return RoleDao.findOne(id);
	}

	@RequestMapping(value = "/midgard/role/{id}", method = RequestMethod.DELETE)
	public void deleteRole(@PathVariable Long id) {
		RoleDao.delete(id);
	}
}
