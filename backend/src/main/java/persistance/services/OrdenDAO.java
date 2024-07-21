package persistance.services;

import models.Orden;
import persistance.interfaces.IOrden;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;

import org.jvnet.hk2.annotations.Service;

import java.util.List;

@Service
public class OrdenDAO implements IOrden {

    private EntityManager entityManager = Persistence.createEntityManagerFactory("backend").createEntityManager();

    @Override
    public Orden create(Orden model) {
        entityManager.persist(model);
        return model;
    }

    @Override
    public Orden getById(Long id) {
        return entityManager.find(Orden.class, id);
    }

    @Override
    public List<Orden> getAll() {
        return entityManager.createQuery("SELECT m FROM Orden m", Orden.class).getResultList();
    }

    @Override
    public Orden update(Orden model) {
        return entityManager.merge(model);
    }

    @Override
    public void delete(Long id) {
        Orden model = getById(id);
        if (model != null) {
            entityManager.remove(model);
        }
    }
}

