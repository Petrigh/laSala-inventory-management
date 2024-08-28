package persistance.services;

import models.Orden;
import persistance.interfaces.IOrden;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;

import org.jvnet.hk2.annotations.Service;

import java.util.List;

@Service
public class OrdenDAO implements IOrden {

    private EntityManager entityManager = Persistence.createEntityManagerFactory("backend").createEntityManager();

    @Override
    public Orden create(Orden model) {
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
    public Orden getById(Long id) {
        return entityManager.find(Orden.class, id);
    }

    @Override
    public List<Orden> getAll() {
        return entityManager.createQuery("FROM Orden").getResultList();
    }

    @Override
    public Orden update(Orden model) {
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
	        Orden model = getById(id);
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

