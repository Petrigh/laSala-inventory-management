package models;

import models.Bien.TipoBien;

public class BienFront {
	Long id;
	String nombre;
	TipoBien tipo;
	Double precioUnitario;
	Double cantidad;
	
	public BienFront() {};
	
	public BienFront(Long id, String nombre, TipoBien tipo, Double latestPrecioUnitario, Double totalCantidad) {
	    this.id = id;
	    this.nombre = nombre;
	    this.tipo = tipo;
	    this.precioUnitario = latestPrecioUnitario;
	    this.cantidad = totalCantidad;
	}
	
	public Long getId() {
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
	public TipoBien getTipo() {
		return tipo;
	}
	public void setTipo(TipoBien tipo) {
		this.tipo = tipo;
	}
	public Double getPrecioUnitario() {
		return precioUnitario;
	}
	public void setPrecioUnitario(Double latestPrecioUnitario) {
		this.precioUnitario = latestPrecioUnitario;
	}
	public Double getCantidad() {
		return cantidad;
	}
	public void setCantidad(Double totalCantidad) {
		this.cantidad = totalCantidad;
	}
}
