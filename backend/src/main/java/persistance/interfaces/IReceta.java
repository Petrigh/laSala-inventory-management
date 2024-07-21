package persistance.interfaces;

import models.Receta;
import java.util.List;

import org.jvnet.hk2.annotations.Contract;

@Contract
public interface IReceta {
    Receta create(Receta model);
    Receta getById(Long id);
    List<Receta> getAll();
    Receta update(Receta model);
    void delete(Long id);
}

