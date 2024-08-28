package persistance.services;

import models.Bien;
import models.Ingrediente;
import models.Receta;
import persistance.interfaces.IReceta;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;

import org.jvnet.hk2.annotations.Service;

import java.util.List;

@Service
public class RecetaDAO implements IReceta {

    private EntityManager entityManager = Persistence.createEntityManagerFactory("backend").createEntityManager();

    @Override
    public Receta create(Receta model) {
    	EntityTransaction trans = null;
    	try {
    		trans = entityManager.getTransaction();
    		trans.begin();
    		List<Ingrediente> list = model.getIngredientes();
    		list.forEach(ing -> {
				ing.setId(null);
        		entityManager.persist(ing);
                entityManager.flush();
                entityManager.refresh(ing);
    		});
    		model.setIngredientes(list);
    		Ingrediente prod = model.getProducto();
    		if(prod.getId() < 0) {
    			prod.setId(null);
    			Bien bien = prod.getBien();
    			bien.setId(null);
        		entityManager.persist(bien);
                entityManager.flush();
                entityManager.refresh(bien);
                prod.setBien(bien);
        		entityManager.persist(prod);
                entityManager.flush();
                entityManager.refresh(prod);
                model.setProducto(prod);			
    		}
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
    public Receta getById(Long id) {
        return entityManager.find(Receta.class, id);
    }

    @Override
    public List<Receta> getAll() {
        return entityManager.createQuery("FROM Receta").getResultList();
    }

    @Override
    public Receta update(Receta model) {
    	EntityTransaction trans = null;
    	try {
    		trans = entityManager.getTransaction();
    		trans.begin();
    		List<Ingrediente> list = model.getIngredientes();
    		list.forEach(ing -> {
        		String jpql = "SELECT u FROM Bien u WHERE u.nombre = :nombre";
        		TypedQuery<Bien> query = entityManager.createQuery(jpql, Bien.class);
        		query.setParameter("nombre", ing.getBien().getNombre());
        		Bien tempBien = query.getSingleResult();
        		ing.setBien(tempBien);
        		entityManager.merge(ing);
    		});
    		model.setIngredientes(list);
    		Ingrediente prod = model.getProducto();
    		if(prod.getId() < 0) {
    			Bien bien = prod.getBien();
    			bien.setId(null);
        		entityManager.persist(bien);
                entityManager.flush();
                entityManager.refresh(bien);
                prod.setBien(bien);
    			prod.setId(null);
        		entityManager.persist(prod);
                entityManager.flush();
                entityManager.refresh(prod);			
    		}else {
        		entityManager.merge(prod);    			
    		}
            model.setProducto(prod);
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
    		Receta model = getById(id);
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

