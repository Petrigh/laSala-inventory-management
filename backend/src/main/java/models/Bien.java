package models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Bien")
public class Bien {
	private enum TipoBien {
		INSUMO, PRODUCTO, MATERIAPRIMA
	}

	@Id @GeneratedValue
	@Column(name="id")
	private long id;
	
	@Column(name="nombre", nullable = false)
	private String nombre;
	
	@Column(name="tipo", nullable = false)
	private TipoBien tipo;
	
	public long getId() {
		return id;
	}

	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public TipoBien getTipo() {
		return tipo;
	}

	public void setTipo(TipoBien tipo) {
		this.tipo = tipo;
	}

}
