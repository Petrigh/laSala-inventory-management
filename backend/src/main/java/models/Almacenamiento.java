package models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="Almacenamiento")
public class Almacenamiento {
	public Almacenamiento() {
		super();
	}
	
	private enum FormaAlmacenamiento {
		FREEZER, DESPENSA, HELADER, REPISA, OTRO
	}


	@Id @GeneratedValue
	@Column(name="id")
	private long id;
	
	@Column(name="fecha")
	private Date fecha;
	
	@Column(name="cantidad", nullable = false)
	private Double cantidad;
	
	@OneToMany
	@JoinColumn(name = "idBien")
	private List<Bien> bienes;
	
	@Column(name="metodo", nullable = false)
	private FormaAlmacenamiento metodo;

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public double getCantidad() {
		return cantidad;
	}

	public void setCantidad(double cantidad) {
		this.cantidad = cantidad;
	}

	public FormaAlmacenamiento getMetodo() {
		return metodo;
	}

	public void setMetodo(FormaAlmacenamiento metodo) {
		this.metodo = metodo;
	}

	public long getId() {
		return id;
	}
	
	public List<Bien> getBien() {
		return bienes;
	}

	public void setBien(List<Bien> bien) {
		this.bienes = bien;
	}
	
}
