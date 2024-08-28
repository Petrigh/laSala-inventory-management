package persistance.services;

import models.FamiliaProductora;
import persistance.interfaces.IFamiliaProductora;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

import org.jvnet.hk2.annotations.Service;

import java.util.List;

@Service
public class FamiliaProductoraDAO implements IFamiliaProductora {

    private EntityManager entityManager = Persistence.createEntityManagerFactory("backend").createEntityManager();

    @Override
    public FamiliaProductora create(FamiliaProductora model) {
    	EntityTransaction trans = null;
    	try {
    		trans = entityManager.getTransaction();
    		trans.begin();
            entityManager.persist(model);
            entityManager.flush();
            entityManager.refresh(model);
            trans.commit();
    	}catch(Exception e) {
    		if(trans != null) {
    			trans.rollback();
    		}
    	}
        return model;
    }

    @Override
    public FamiliaProductora getById(Long id) {
        return entityManager.find(FamiliaProductora.class, id);
    }

    @Override
    public List<FamiliaProductora> getAll() {
        return entityManager.createQuery("FROM FamiliaProductora").getResultList();
    }

    @Override
    public FamiliaProductora update(FamiliaProductora model) {
    	EntityTransaction trans = null;
    	try {
    		trans = entityManager.getTransaction();
    		trans.begin();
    		model = entityManager.merge(model);
            trans.commit();
    	}catch(Exception e) {
    		if(trans != null) {
    			trans.rollback();
    		}
    	}
        return model;
    }

    @Override
    public void delete(Long id) {
    	EntityTransaction trans = null;
    	try {
    		trans = entityManager.getTransaction();
    		trans.begin();
            FamiliaProductora model = getById(id);
            if (model != null) {
                entityManager.remove(model);
            }
            trans.commit();
    	}catch(Exception e) {
    		if(trans != null) {
    			trans.rollback();
    		}
    	}
    }
}

