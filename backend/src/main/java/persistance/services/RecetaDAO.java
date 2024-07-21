package persistance.services;

import models.Receta;
import persistance.interfaces.IReceta;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;

import org.jvnet.hk2.annotations.Service;

import java.util.List;

@Service
public class RecetaDAO implements IReceta {

    private EntityManager entityManager = Persistence.createEntityManagerFactory("backend").createEntityManager();

    @Override
    public Receta create(Receta model) {
        entityManager.persist(model);
        return model;
    }

    @Override
    public Receta getById(Long id) {
        return entityManager.find(Receta.class, id);
    }

    @Override
    public List<Receta> getAll() {
        return entityManager.createQuery("SELECT m FROM Receta m", Receta.class).getResultList();
    }

    @Override
    public Receta update(Receta model) {
        return entityManager.merge(model);
    }

    @Override
    public void delete(Long id) {
        Receta model = getById(id);
        if (model != null) {
            entityManager.remove(model);
        }
    }
}

