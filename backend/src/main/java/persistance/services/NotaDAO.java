package persistance.services;

import models.Nota;
import persistance.interfaces.INota;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;

import org.jvnet.hk2.annotations.Service;

import java.util.List;

@Service
public class NotaDAO implements INota {

    private EntityManager entityManager = Persistence.createEntityManagerFactory("backend").createEntityManager();

    @Override
    public Nota create(Nota model) {
        entityManager.persist(model);
        return model;
    }

    @Override
    public Nota getById(Long id) {
        return entityManager.find(Nota.class, id);
    }

    @Override
    public List<Nota> getAll() {
        return entityManager.createQuery("SELECT m FROM Nota m", Nota.class).getResultList();
    }

    @Override
    public Nota update(Nota model) {
        return entityManager.merge(model);
    }

    @Override
    public void delete(Long id) {
        Nota model = getById(id);
        if (model != null) {
            entityManager.remove(model);
        }
    }
}

