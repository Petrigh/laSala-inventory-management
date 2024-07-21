package persistance.services;

import models.Canal;
import persistance.interfaces.ICanal;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;

import org.jvnet.hk2.annotations.Service;

import java.util.List;

@Service
public class CanalDAO implements ICanal {

    private EntityManager entityManager = Persistence.createEntityManagerFactory("backend").createEntityManager();

    @Override
    public Canal create(Canal model) {
        entityManager.persist(model);
        return model;
    }

    @Override
    public Canal getById(Long id) {
        return entityManager.find(Canal.class, id);
    }

    @Override
    public List<Canal> getAll() {
        return entityManager.createQuery("SELECT m FROM Canal m", Canal.class).getResultList();
    }

    @Override
    public Canal update(Canal model) {
        return entityManager.merge(model);
    }

    @Override
    public void delete(Long id) {
        Canal model = getById(id);
        if (model != null) {
            entityManager.remove(model);
        }
    }
}

