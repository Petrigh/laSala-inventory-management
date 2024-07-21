package persistance.interfaces;

import models.Item;
import java.util.List;

import org.jvnet.hk2.annotations.Contract;

@Contract
public interface IItem {
    Item create(Item model);
    Item getById(Long id);
    List<Item> getAll();
    Item update(Item model);
    void delete(Long id);
}

