package utils;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.jvnet.hk2.annotations.Service;
import org.glassfish.hk2.api.Factory;

@Service
public class EntityManagerProvider implements Factory<EntityManager> {

    private final EntityManagerFactory emf;

    public EntityManagerProvider() {
        emf = Persistence.createEntityManagerFactory("backend");
    }

    @Override
    public EntityManager provide() {
        return emf.createEntityManager();
    }

    @Override
    public void dispose(EntityManager em) {
        if (em != null && em.isOpen()) {
            em.close();
        }
    }

    public void close() {
        if (emf != null && emf.isOpen()) {
            emf.close();
        }
    }

}
