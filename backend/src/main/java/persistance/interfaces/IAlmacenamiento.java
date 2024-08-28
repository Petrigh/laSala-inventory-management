package persistance.interfaces;

import models.Almacenamiento;
import models.BienFront;

import java.util.List;

import org.jvnet.hk2.annotations.Contract;

@Contract
public interface IAlmacenamiento {
    Almacenamiento create(Almacenamiento model);
    Almacenamiento getById(Long id);
    List<Almacenamiento> getAll();
    List<BienFront> getProductos();
    List<BienFront> getInsumos();
    List<BienFront> getMatPrim();
    Almacenamiento update(Almacenamiento model);
    void delete(Long id);
	void updateProducto(BienFront model);
	BienFront createProducto(BienFront model);
}

