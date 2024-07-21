package models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Canal")
public class Canal {
	public Canal() {
		super();
	}
	private enum Ubicacion {
		WEB, FISICO
	}


	@Id @GeneratedValue
	@Column(name="id")
	private long id;
	@Column(name="nombre")
	private String nombre;
	@Column(name="tipo")
	private Ubicacion tipo;
	@Column(name="direccion")
	private String direccion;
	
	public long getId() {
		return id;
	}

	public String getNombre() {
		return nombre;
	}
	
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	public Ubicacion getTipo() {
		return tipo;
	}
	
	public void setTipo(Ubicacion tipo) {
		this.tipo = tipo;
	}
	
	public String getDireccion() {
		return direccion;
	}
	
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
}
