package persistance.interfaces;

import models.Bien;
import java.util.List;

import org.jvnet.hk2.annotations.Contract;

@Contract
public interface IBien {
    Bien create(Bien model);
    Bien getById(Long id);
    List<Bien> getAll();
    Bien update(Bien model);
    void delete(Long id);
}

