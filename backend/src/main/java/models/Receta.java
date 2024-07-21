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
	public List<Item> getIngredientes() {
		return ingredientes;
	}

	public void setIngredientes(List<Item> ingredientes) {
		this.ingredientes = ingredientes;
	}

	public Item getProducto() {
		return producto;
	}

	public void setProducto(Item producto) {
		this.producto = producto;
	}

	@Id @GeneratedValue
	@Column(name="id")
	private long id;
	
	@Column(name="nombre")
	private String nombre;

	@ManyToMany
	@JoinTable(name="receta_ingredientes",
			joinColumns = @JoinColumn(name="idReceta"),
			inverseJoinColumns = @JoinColumn(name = "idIngrediente", nullable = true))
	private List<Item> ingredientes;
	
	@OneToOne
	@JoinColumn(name="idProducto")
	private Item producto;
	
	
	@Column(name="descripcion")
	private String descripcion;

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public long getId() {
		return id;
	}

	public Receta() {
		super();
	}
}
