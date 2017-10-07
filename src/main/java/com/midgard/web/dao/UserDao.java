package com.midgard.web.dao;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.midgard.web.model.User;

public interface UserDao extends JpaRepository<User, Serializable> {
	@Query("select u from User u where u.username like :login")
	User getUserByLogin(@Param("login") String login);
}
