package utils;

import java.io.IOException;
import java.util.Iterator;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


public class ApiOriginFilter implements Filter{
	 @Override
	  public void doFilter(ServletRequest request, ServletResponse response,
	      FilterChain chain) throws IOException, ServletException {
		 
	    HttpServletResponse res = (HttpServletResponse) response;
	    HttpServletRequest req = (HttpServletRequest) request;

	    res.addHeader("Access-Control-Allow-Origin", "*");
	    res.addHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
	    res.addHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	    res.addHeader("Access-Control-Allow-Credentials", "true");

	    if ("OPTIONS".equalsIgnoreCase(req.getMethod())) {
	        res.setStatus(HttpServletResponse.SC_OK);
	        return;
	    }

	    String path = req.getRequestURI().substring(req.getContextPath().length());
	    if (!path.startsWith("/rest/usuario")) {

	        String authHeader = req.getHeader("Authorization");
	        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
	            res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
	            return;
	        }
	    }
	    chain.doFilter(request, res);
	  }

	  @Override
	  public void destroy() {
	  }

	  @Override
	  public void init(FilterConfig filterConfig) throws ServletException {
	  }
}
