package persistance.services;

import models.Item;
import persistance.interfaces.IItem;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;

import org.jvnet.hk2.annotations.Service;

import java.util.List;

@Service
public class ItemDAO implements IItem {

    private EntityManager entityManager = Persistence.createEntityManagerFactory("backend").createEntityManager();

    @Override
    public Item create(Item model) {
        entityManager.persist(model);
        return model;
    }

    @Override
    public Item getById(Long id) {
        return entityManager.find(Item.class, id);
    }

    @Override
    public List<Item> getAll() {
        return entityManager.createQuery("SELECT m FROM Item m", Item.class).getResultList();
    }

    @Override
    public Item update(Item model) {
        return entityManager.merge(model);
    }

    @Override
    public void delete(Long id) {
        Item model = getById(id);
        if (model != null) {
            entityManager.remove(model);
        }
    }
}

