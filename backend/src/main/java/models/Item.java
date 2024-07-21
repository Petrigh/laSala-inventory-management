package models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="Ingrediente")
public class Item {
	@Id @GeneratedValue
	@Column(name="id")
	private long id;
	
	@Column(name="cantidad", precision = 10, scale = 2)	
	private Double cantidad;
	
	@Column(name="precioUintario", precision = 10, scale = 2)	
	private Double precioUnitario;
	
	@ManyToOne
	@JoinColumn(name="idBien")
	private Bien bien;
	
	@ManyToMany(mappedBy = "ingredientes")
	private List<Receta> recetas;
	
	public double getCantidad() {
		return cantidad;
	}
	public void setCantidad(Double cantidad) {
		this.cantidad = cantidad;
	}
	public double getPrecioUnitario() {
		return precioUnitario;
	}
	public void setPrecioUnitario(Double precioUnitario) {
		this.precioUnitario = precioUnitario;
	}
	public Bien getBien() {
		return bien;
	}
	public void setBien(Bien bien) {
		this.bien = bien;
	}
	public long getId() {
		return id;
	}
	public Item() {
		super();
	}

}
