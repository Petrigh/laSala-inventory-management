package persistance.interfaces;

import models.Almacenamiento;
import java.util.List;

import org.jvnet.hk2.annotations.Contract;

@Contract
public interface IAlmacenamiento {
    Almacenamiento create(Almacenamiento model);
    Almacenamiento getById(Long id);
    List<Almacenamiento> getAll();
    Almacenamiento update(Almacenamiento model);
    void delete(Long id);
}

