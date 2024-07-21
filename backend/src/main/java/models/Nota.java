package models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="Nota")
public class Nota {
	public Receta getReceta() {
		return receta;
	}

	public void setReceta(Receta receta) {
		this.receta = receta;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Usuario getAutor() {
		return autor;
	}

	public void setAutor(Usuario autor) {
		this.autor = autor;
	}

	public long getId() {
		return id;
	}

	public Nota() {
		super();
	}
	@Id @GeneratedValue
	@Column(name="id")
	private long id;
	
	@Column(name="fecha")
	private Date fecha;
	
    @ManyToOne
    @JoinColumn(name = "idReceta")
	private Receta receta;
    
	@Column(name="descripcion")
	private String descripcion;

    @ManyToOne
    @JoinColumn(name = "idAutor")
	private Usuario autor;
	
}
