package persistance.services;

import models.Almacenamiento;
import persistance.interfaces.IAlmacenamiento;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;

import org.jvnet.hk2.annotations.Service;

import jakarta.inject.Inject;

import java.util.List;

@Service
public class AlmacenamientoDAO implements IAlmacenamiento {

    private EntityManager entityManager = Persistence.createEntityManagerFactory("backend").createEntityManager();

    @Override
    public Almacenamiento create(Almacenamiento model) {
        entityManager.persist(model);
        return model;
    }

    @Override
    public Almacenamiento getById(Long id) {
        return entityManager.find(Almacenamiento.class, id);
    }

    @Override
    public List<Almacenamiento> getAll() {
        return entityManager.createQuery("SELECT m FROM Almacenamiento m", Almacenamiento.class).getResultList();
    }

    @Override
    public Almacenamiento update(Almacenamiento model) {
        return entityManager.merge(model);
    }

    @Override
    public void delete(Long id) {
        Almacenamiento model = getById(id);
        if (model != null) {
            entityManager.remove(model);
        }
    }
}

