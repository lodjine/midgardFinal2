package com.midgard.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.midgard.web.dao.UserDao;
import com.midgard.web.model.Tache;
import com.midgard.web.model.User;

@RestController
public class UserService {

	@Autowired
	private UserDao userDao;

	@RequestMapping(value = "/user", method = RequestMethod.POST)
	public User saveUser(@RequestBody User user) {
		user.setActive(1);
		userDao.save(user);
		return user;
	}

	@RequestMapping(value = "/user", method = RequestMethod.PUT)
	public User updateUser(@RequestBody User user) {
		user.setActive(1);
		userDao.save(user);
		return user;
	}

	@RequestMapping(value = "/user", method = RequestMethod.GET)
	public List<User> getUsers() {
		return userDao.findAll();
	}

	@RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
	public User getUser(@PathVariable Long id) {
		return userDao.findOne(id);
	}

	@RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
	public void deleteUser(@PathVariable Long id) {
		userDao.delete(id);
	}
	@RequestMapping(value = "/userByLogin/{login}", method = RequestMethod.GET)
	public User getUserByLogin(@PathVariable String login) {
		return userDao.getUserByLogin(login);
	}
	
	@RequestMapping(value = "/getIsIngenieurById/{id}", method = RequestMethod.GET)
	public boolean getIsIngenieurById(@PathVariable long id) {
		return userDao.getIsIngenieurById(id);
	}
	
	
}