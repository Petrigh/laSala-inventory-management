package persistance.services;

import models.Almacenamiento;
import models.Bien;
import models.Bien.TipoBien;
import models.BienFront;
import models.Ingrediente;
import models.Usuario;
import persistance.interfaces.IAlmacenamiento;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.NoResultException;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.jvnet.hk2.annotations.Service;


import java.util.List;
import java.util.ArrayList;

@Service
public class AlmacenamientoDAO implements IAlmacenamiento {

    private EntityManager entityManager = Persistence.createEntityManagerFactory("backend").createEntityManager();

    @Override
    public Almacenamiento create(Almacenamiento model) {
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
    public Almacenamiento getById(Long id) {
        return entityManager.find(Almacenamiento.class, id);
    }

    @Override
    public List<Almacenamiento> getAll() {
        return entityManager.createQuery("FROM Almacenamiento").getResultList();
    }

    @Override
    public Almacenamiento update(Almacenamiento model) {
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
            Almacenamiento model = getById(id);
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
	public void updateProducto(BienFront model) {
    	EntityTransaction trans = null;
		Ingrediente ing;
		Bien bien;
    	try {
    		trans = entityManager.getTransaction();
    		trans.begin();
    		String jpql = "SELECT u FROM Bien u WHERE u.nombre = :nombre";
    		TypedQuery<Bien> query = entityManager.createQuery(jpql, Bien.class);
    		query.setParameter("nombre", model.getNombre());
    		bien = query.getSingleResult();
    		ing = entityManager.find(Ingrediente.class, model.getId());
    		ing.setCantidad(model.getCantidad());
    		ing.setPrecioUnitario(model.getPrecioUnitario());
    		bien.setNombre(model.getNombre());
    		entityManager.merge(bien);
    		ing.setBien(bien);
    		entityManager.merge(ing);
            trans.commit();
    	}catch(Exception e) {
    		if(trans != null) {
    			trans.rollback();
    		}
    	}
	}

	@Override
	@Transactional
	public BienFront createProducto(BienFront model) {
    	EntityTransaction trans = null;
    	Bien bien = new Bien();
    	bien.setNombre(model.getNombre());
    	bien.setTipo(model.getTipo());
    	try {
    		trans = entityManager.getTransaction();
    		trans.begin(); 
            entityManager.persist(bien);
            entityManager.flush();
            entityManager.refresh(bien);
            Ingrediente ing = new Ingrediente();
            ing.setBien(bien);
            ing.setCantidad(model.getCantidad());
    		ing.setPrecioUnitario(model.getPrecioUnitario());
            entityManager.persist(ing);
            entityManager.flush();
            entityManager.refresh(ing);
            model.setId(ing.getId());
            trans.commit();
    	}catch(Exception e) {
    		if(trans != null) {
    			trans.rollback();
    		}
    	}
        return model;
	}

	@Override
	@Transactional
	public List<BienFront> getProductos() {
	    String jpql = "SELECT MIN(b.id), b.nombre, b.tipo, MAX(i.precioUnitario), SUM(i.cantidad) " +
                "FROM Ingrediente i " +
                "JOIN i.idBien b " +
                "WHERE b.tipo = 1 " +
                "GROUP BY b.nombre, b.tipo";

		  List<Object[]> results = entityManager.createQuery(jpql, Object[].class).getResultList();
		
		  List<BienFront> bienFronts = new ArrayList<>();
		  for (Object[] result : results) {
		      BienFront bienFront = new BienFront(
		          (Long) result[0],                 // id (aggregated)
		          (String) result[1],               // nombre
		          (Bien.TipoBien) result[2],        // tipo
		          (Double) result[3],               // precioUnitario (max value per group)
		          ((Number) result[4]).doubleValue() // totalCantidad (sum per group)
		      );
		      bienFronts.add(bienFront);
		  }
		
		  return bienFronts;
	}

	@Override
	@Transactional
	public List<BienFront> getInsumos() {
	    String jpql = "SELECT MIN(b.id), b.nombre, b.tipo, MAX(i.precioUnitario), SUM(i.cantidad) " +
                "FROM Ingrediente i " +
                "JOIN i.idBien b " +
                "WHERE b.tipo = 0 " +
                "GROUP BY b.nombre, b.tipo";

		  List<Object[]> results = entityManager.createQuery(jpql, Object[].class).getResultList();
		
		  List<BienFront> bienFronts = new ArrayList<>();
		  for (Object[] result : results) {
		      BienFront bienFront = new BienFront(
		          (Long) result[0],                 // id (aggregated)
		          (String) result[1],               // nombre
		          (Bien.TipoBien) result[2],        // tipo
		          (Double) result[3],               // precioUnitario (max value per group)
		          ((Number) result[4]).doubleValue() // totalCantidad (sum per group)
		      );
		      bienFronts.add(bienFront);
		  }
		
		  return bienFronts;
	}
	
	@Override
	@Transactional
	public List<BienFront> getMatPrim() {
	    String jpql = "SELECT MIN(b.id), b.nombre, b.tipo, MAX(i.precioUnitario), SUM(i.cantidad) " +
	                  "FROM Ingrediente i " +
	                  "JOIN i.idBien b " +
	                  "WHERE b.tipo = 2 " +
	                  "GROUP BY b.nombre, b.tipo";

	    List<Object[]> results = entityManager.createQuery(jpql, Object[].class).getResultList();

	    List<BienFront> bienFronts = new ArrayList<>();
	    for (Object[] result : results) {
	        BienFront bienFront = new BienFront(
	            (Long) result[0],                 // id (aggregated)
	            (String) result[1],               // nombre
	            (Bien.TipoBien) result[2],        // tipo
	            (Double) result[3],               // precioUnitario (max value per group)
	            ((Number) result[4]).doubleValue() // totalCantidad (sum per group)
	        );
	        bienFronts.add(bienFront);
	    }

	    return bienFronts;
	}

}

