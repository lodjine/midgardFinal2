package com.midgard.web.dao;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;

import com.midgard.web.model.Role;
public interface RoleDao extends JpaRepository<Role, Serializable> {

}
