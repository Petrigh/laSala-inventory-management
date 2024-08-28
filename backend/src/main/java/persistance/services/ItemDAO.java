package persistance.services;

import models.Ingrediente;
import persistance.interfaces.IItem;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.transaction.Transactional;

import org.jvnet.hk2.annotations.Service;

import java.util.List;

@Service
public class ItemDAO implements IItem {

    private EntityManager entityManager = Persistence.createEntityManagerFactory("backend").createEntityManager();

    @Override
    public Ingrediente create(Ingrediente model) {
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
    public Ingrediente getById(Long id) {
        return entityManager.find(Ingrediente.class, id);
    }

    @Override
    public List<Ingrediente> getAll() {
        return entityManager.createQuery("FROM Ingrediente", Ingrediente.class).getResultList();
    }

    @Override
    public Ingrediente update(Ingrediente model) {
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
            Ingrediente model = getById(id);
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

	@Override
	@Transactional
	public List<Ingrediente> getMatPrim() {
		String jpql = "SELECT new models.Ingrediente(" +
	              "   i.id, " +
	              "   i.cantidad, " +
	              "   i.precioUnitario, " +
	              "   i.idBien" +
	              ") " +
	              "FROM Ingrediente i " +
	              "JOIN i.idBien b " +
	              "WHERE b.tipo = 2 " +
	              "AND i.id IN (" +
	              "   SELECT MIN(i2.id) " +
	              "   FROM Ingrediente i2 " +
	              "   JOIN i2.idBien b2 " +
	              "   WHERE b2.tipo = 2 " +
	              "   GROUP BY b2.nombre" +
	              ")";

	    return entityManager.createQuery(jpql, Ingrediente.class).getResultList();
	}

	@Override
	@Transactional
	public List<Ingrediente> getProductos() {
		String jpql = "SELECT new models.Ingrediente(" +
	              "   i.id, " +
	              "   i.cantidad, " +
	              "   i.precioUnitario, " +
	              "   i.idBien" +
	              ") " +
	              "FROM Ingrediente i " +
	              "JOIN i.idBien b " +
	              "WHERE b.tipo = 1 " +
	              "AND i.id IN (" +
	              "   SELECT MIN(i2.id) " +
	              "   FROM Ingrediente i2 " +
	              "   JOIN i2.idBien b2 " +
	              "   WHERE b2.tipo = 1 " +
	              "   GROUP BY b2.nombre" +
	              ")";

	    return entityManager.createQuery(jpql, Ingrediente.class).getResultList();
	}

	@Override
	@Transactional
	public List<Ingrediente> getInsumos() {
		String jpql = "SELECT new models.Ingrediente(" +
	              "   i.id, " +
	              "   i.cantidad, " +
	              "   i.precioUnitario, " +
	              "   i.idBien" +
	              ") " +
	              "FROM Ingrediente i " +
	              "JOIN i.idBien b " +
	              "WHERE b.tipo = 0 " +
	              "AND i.id IN (" +
	              "   SELECT MIN(i2.id) " +
	              "   FROM Ingrediente i2 " +
	              "   JOIN i2.idBien b2 " +
	              "   WHERE b2.tipo = 0 " +
	              "   GROUP BY b2.nombre" +
	              ")";
	    return entityManager.createQuery(jpql, Ingrediente.class).getResultList();
	}
}

