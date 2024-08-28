package persistance.services;

import models.Usuario;
import persistance.interfaces.IUsuario;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.NoResultException;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;

import org.jvnet.hk2.annotations.Service;

import java.util.List;

@Service
public class UsuarioDAO implements IUsuario {

    private EntityManager entityManager = Persistence.createEntityManagerFactory("backend").createEntityManager();

    @Override
    public Usuario create(Usuario model) {
    	EntityTransaction trans = null;
    	model.generateSalt();
    	try {
        	model.encodePassword();
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
    	Usuario dbUser = getById(model.getId());
    	try {
        	if(!model.getPassword().equals(dbUser.getPassword())){
        		model.encodePassword();
        	}
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
    	Usuario usr = this.getById(id);
    	usr.setActive(false);
    	this.update(usr);
    }
    
    @Override
    public void activate(Long id) {
    	Usuario usr = this.getById(id);
    	usr.setActive(true);
    	this.update(usr);
    }

	@Override
	public Usuario getByUsuario(String usuario) {
		String jpql = "SELECT u FROM Usuario u WHERE u.usuario = :usuario";
        TypedQuery<Usuario> query = entityManager.createQuery(jpql, Usuario.class);
        query.setParameter("usuario", usuario);try {
            return query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
	}
}

