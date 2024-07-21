package persistance.services;

import models.Usuario;
import persistance.interfaces.IUsuario;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;

import org.jvnet.hk2.annotations.Service;

import jakarta.inject.Inject;

import java.util.List;

@Service
public class UsuarioDAO implements IUsuario {

    private EntityManager entityManager = Persistence.createEntityManagerFactory("backend").createEntityManager();

    @Override
    public Usuario create(Usuario model) {
    	EntityTransaction trans = null;
    	try {
    		trans = entityManager.getTransaction();
    		trans.begin();
            entityManager.persist(model);
            trans.commit();
    	}catch(Exception e) {
    		if(trans != null) {
    			trans.rollback();
    		}
    	}
        return model;
    }

    @Override
    public Usuario getById(Long id) {
        return entityManager.find(Usuario.class, id);
    }

    @Override
    public List<Usuario> getAll() {
        return entityManager.createQuery("FROM Usuario").getResultList();
    }

    @Override
    public Usuario update(Usuario model) {
    	EntityTransaction trans = null;
    	try {
    		trans = entityManager.getTransaction();
    		trans.begin();
    		entityManager.merge(model);
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
            Usuario model = getById(id);
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

