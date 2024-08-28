package persistance.services;

import models.Nota;
import persistance.interfaces.INota;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

import org.jvnet.hk2.annotations.Service;

import java.util.List;

@Service
public class NotaDAO implements INota {

    private EntityManager entityManager = Persistence.createEntityManagerFactory("backend").createEntityManager();

    @Override
    public Nota create(Nota model) {
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
    public Nota getById(Long id) {
        return entityManager.find(Nota.class, id);
    }

    @Override
    public List<Nota> getAll() {
        return entityManager.createQuery("FROM Nota").getResultList();
    }

    @Override
    public Nota update(Nota model) {
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
            Nota model = getById(id);
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

