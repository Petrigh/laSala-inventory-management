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
public class Ingrediente {
	@Id @GeneratedValue
	@Column(name="id")
	private Long id;
	
	@Column(name="cantidad", precision = 10, scale = 2)	
	private Double cantidad;
	
	@Column(name="precioUnitario", precision = 10, scale = 2)	
	private Double precioUnitario;
	
	@ManyToOne
	@JoinColumn(name="idBien", referencedColumnName = "id")
	private Bien idBien;
	
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
		return idBien;
	}
	public void setBien(Bien bien) {
		this.idBien = bien;
	}
	public long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Ingrediente() {
		super();
	}

    public Ingrediente(Long id, Double cantidad, Double precioUnitario, Bien idBien) {
        this.id = id;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.idBien = idBien;
    }

}
