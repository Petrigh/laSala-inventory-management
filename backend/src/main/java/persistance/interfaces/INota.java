package persistance.interfaces;

import models.Nota;
import java.util.List;

import org.jvnet.hk2.annotations.Contract;

@Contract
public interface INota {
    Nota create(Nota model);
    Nota getById(Long id);
    List<Nota> getAll();
    Nota update(Nota model);
    void delete(Long id);
}

