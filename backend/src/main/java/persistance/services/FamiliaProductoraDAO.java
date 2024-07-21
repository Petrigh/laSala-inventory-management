package persistance.services;

import models.FamiliaProductora;
import persistance.interfaces.IFamiliaProductora;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;

import org.jvnet.hk2.annotations.Service;

import java.util.List;

@Service
public class FamiliaProductoraDAO implements IFamiliaProductora {

    private EntityManager entityManager = Persistence.createEntityManagerFactory("backend").createEntityManager();

    @Override
    public FamiliaProductora create(FamiliaProductora model) {
        entityManager.persist(model);
        return model;
    }

    @Override
    public FamiliaProductora getById(Long id) {
        return entityManager.find(FamiliaProductora.class, id);
    }

    @Override
    public List<FamiliaProductora> getAll() {
        return entityManager.createQuery("SELECT m FROM FamiliaProductora m", FamiliaProductora.class).getResultList();
    }

    @Override
    public FamiliaProductora update(FamiliaProductora model) {
        return entityManager.merge(model);
    }

    @Override
    public void delete(Long id) {
        FamiliaProductora model = getById(id);
        if (model != null) {
            entityManager.remove(model);
        }
    }
}

