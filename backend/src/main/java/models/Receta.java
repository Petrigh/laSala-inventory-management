package models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="Receta")
public class Receta {

	@Id @GeneratedValue
	@Column(name="id")
	private Long id;
	
	@Column(name="nombre")
	private String nombre;

	@ManyToMany
	@JoinTable(name="receta_ingredientes",
			joinColumns = @JoinColumn(name="idReceta"),
			inverseJoinColumns = @JoinColumn(name = "idIngrediente", nullable = true))
	private List<Ingrediente> ingredientes;
	
	@OneToOne
	@JoinColumn(name="idProducto")
	private Ingrediente producto;
	
	
	@Column(name="descripcion")
	private String descripcion;

	public String getNombre() {
		return this.nombre;
	}

	public List<Ingrediente> getIngredientes() {
		return this.ingredientes;
	}
	
	public void setIngredientes(List<Ingrediente> ingredientes) {
		this.ingredientes = ingredientes;
	}
	
	public Ingrediente getProducto() {
		return this.producto;
	}
	
	public void setProducto(Ingrediente producto) {
		this.producto = producto;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getDescripcion() {
		return this.descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Long getId() {
		return this.id;
	}

	public Receta() {
		super();
	}
}
