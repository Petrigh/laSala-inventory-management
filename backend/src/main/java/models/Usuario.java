package models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

@Entity
@Table(name="Usuario")
public class Usuario {
	
	public enum Rol {
		ADMINISTRADOR, ENCARGADO
	}
	
	@Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;
    
    @Column(name = "usuario", unique = true, nullable = false)
    private String usuario;
    
    @Column(name = "nombre", nullable = false)
    private String nombre;
    
    @Column(name = "apellido", nullable = false)
    private String apellido;
    
    @Column(name = "email", unique = true, nullable = false)
    private String email;
    
    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "salt", nullable = false)
    private String salt;
    
    @Column(name = "active", nullable = false)
    private Boolean active;
    
    @Column(name = "rol", nullable = false)
    private Rol rol;

	public Long getId() {
		return id;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean isActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public Rol getRol() {
		return rol;
	}

	public void setRol(Rol rol) {
		this.rol = rol;
	}

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }
    
	public void generateSalt() {
		SecureRandom secureRandom = new SecureRandom();
        byte[] salt = new byte[7];
        secureRandom.nextBytes(salt);
        this.salt = Base64.getEncoder().encodeToString(salt);
    }
	
	public void encodePassword() throws NoSuchAlgorithmException{
        byte[] salt = Base64.getDecoder().decode(this.salt);
        MessageDigest md = MessageDigest.getInstance("SHA-512");
        md.update(salt);
        byte[] hashedPassword = md.digest(password.getBytes(StandardCharsets.UTF_8));

		this.password = Base64.getEncoder().encodeToString(hashedPassword);
	}
	
	public boolean checkPassword(String enteredPassword) throws NoSuchAlgorithmException{
        byte[] salt = Base64.getDecoder().decode(this.salt);
        MessageDigest md = MessageDigest.getInstance("SHA-512");
        md.update(salt);
        byte[] hashedPassword = md.digest(enteredPassword.getBytes(StandardCharsets.UTF_8));

        return Base64.getEncoder().encodeToString(hashedPassword).equals(this.password);
	}
}
