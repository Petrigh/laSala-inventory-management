package persistance.interfaces;

import models.Canal;
import java.util.List;

import org.jvnet.hk2.annotations.Contract;

@Contract
public interface ICanal {
    Canal create(Canal model);
    Canal getById(Long id);
    List<Canal> getAll();
    Canal update(Canal model);
    void delete(Long id);
}

