package models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="Orden")
public class Orden {
	@Id @GeneratedValue
	@Column(name="id")
	private Long id;
	
	@Column(name="fecha")
	private Date fecha;

	@Column(name="total", precision = 10, scale = 2)
	private Double total;
	
	@OneToMany
	@JoinColumn(name="idMercaderia")
	private List<Ingrediente> mercaderias;
	
	@ManyToOne
	@JoinColumn(name="idUsuario")
	private Usuario comerciante;
	
	@ManyToOne
	@JoinColumn(name="idCanal")
	private Canal canal;
	

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public List<Ingrediente> getMercaderias() {
		return mercaderias;
	}

	public void setMercaderias(List<Ingrediente> mercaderias) {
		this.mercaderias = mercaderias;
	}

	public Usuario getComerciante() {
		return comerciante;
	}

	public void setComerciante(Usuario comerciante) {
		this.comerciante = comerciante;
	}

	public Long getId() {
		return id;
	}

	public Orden() {
		super();
	}

	
}
