package persistance.interfaces;

import models.Ingrediente;

import java.util.List;

import org.jvnet.hk2.annotations.Contract;

@Contract
public interface IItem {
    Ingrediente create(Ingrediente model);
    Ingrediente getById(Long id);
    List<Ingrediente> getAll();
    List<Ingrediente> getInsumos();
    List<Ingrediente> getProductos();
    List<Ingrediente> getMatPrim();
    Ingrediente update(Ingrediente model);
    void delete(Long id);
}

