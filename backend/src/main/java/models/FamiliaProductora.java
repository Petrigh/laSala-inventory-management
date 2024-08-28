package models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="FamiliaProductora")
public class FamiliaProductora {
	public FamiliaProductora() {
		super();
	}

	@Id @GeneratedValue
	@Column(name="id")
	private Long id;
	
	@Column(name="nombre")
	private String nombre;
	
	@OneToMany
	@JoinColumn(name = "idBien")
	private List<Bien> bienes;
	
	public long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
}
