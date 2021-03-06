package com.midgard.web.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter{
	@Override
public void addViewControllers(ViewControllerRegistry  viewControllerRegistry){
	viewControllerRegistry.addViewController("/login").setViewName("login");
	viewControllerRegistry.addViewController("/logout").setViewName("login");
	viewControllerRegistry.addViewController("/index").setViewName("index");
	viewControllerRegistry.addViewController("/").setViewName("index");
}

}
