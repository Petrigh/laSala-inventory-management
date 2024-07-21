package utils;

import java.io.IOException;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletResponse;


public class ApiOriginFilter implements Filter{
	 @Override
	  public void doFilter(ServletRequest request, ServletResponse response,
	      FilterChain chain) throws IOException, ServletException {
	    HttpServletResponse res = (HttpServletResponse) response;
	    res.addHeader("Access-Control-Allow-Origin", "*");
	    res.addHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
	    res.addHeader("Access-Control-Allow-Headers", "Content-Type, api_key, Authorization");
	    chain.doFilter(request, res);
	  }

	  @Override
	  public void destroy() {
	  }

	  @Override
	  public void init(FilterConfig filterConfig) throws ServletException {
	  }
}
