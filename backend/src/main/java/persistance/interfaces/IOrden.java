package persistance.interfaces;

import models.Orden;
import java.util.List;

import org.jvnet.hk2.annotations.Contract;

@Contract
public interface IOrden {
    Orden create(Orden model);
    Orden getById(Long id);
    List<Orden> getAll();
    Orden update(Orden model);
    void delete(Long id);
}

