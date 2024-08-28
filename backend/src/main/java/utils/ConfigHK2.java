package utils;

import org.glassfish.jersey.server.ResourceConfig;

public class ConfigHK2 extends ResourceConfig {
	
	public ConfigHK2() {
        packages("presistance.services");
        packages("presistance.beans");
        packages("resourcesRest");
        register(new ServiceBinder());
    }
}
