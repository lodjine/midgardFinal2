package com.midgard.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class LoginController {
	@RequestMapping("/login")
	public String login() {
		return "login";
	}

	@RequestMapping("/index")
	public String index() {
		return "index";
	}

	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logout(HttpServletRequest request, HttpServletResponse response) {
		Authentication aut = SecurityContextHolder.getContext().getAuthentication();
		if (aut != null) {
			new SecurityContextLogoutHandler().logout(request, response, aut);
		}
		return "redirect:/login?logout";
	}
}
