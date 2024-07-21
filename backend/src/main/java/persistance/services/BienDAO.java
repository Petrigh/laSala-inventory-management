package persistance.services;

import models.Bien;
import persistance.interfaces.IBien;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;

import org.jvnet.hk2.annotations.Service;

import java.util.List;

@Service
public class BienDAO implements IBien {

    private EntityManager entityManager = Persistence.createEntityManagerFactory("backend").createEntityManager();

    @Override
    public Bien create(Bien model) {
        entityManager.persist(model);
        return model;
    }

    @Override
    public Bien getById(Long id) {
        return entityManager.find(Bien.class, id);
    }

    @Override
    public List<Bien> getAll() {
        return entityManager.createQuery("SELECT m FROM Bien m", Bien.class).getResultList();
    }

    @Override
    public Bien update(Bien model) {
        return entityManager.merge(model);
    }

    @Override
    public void delete(Long id) {
        Bien model = getById(id);
        if (model != null) {
            entityManager.remove(model);
        }
    }
}

