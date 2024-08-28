package persistance.beans;

import java.security.Key;

import javax.crypto.SecretKey;

import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.inject.Singleton;
import persistance.interfaces.IKeyManager;

@Singleton
public class ConfigJWT implements IKeyManager{
	private SecretKey key;

	@PostConstruct
    public void init() {
        byte[] secretkey = new byte[32];
        key = Keys.hmacShaKeyFor(secretkey);
    }

    public Key getKey() {
        return key;
    }
	
}
