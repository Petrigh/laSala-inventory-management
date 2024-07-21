package utils;

import javax.persistence.EntityManager;

import org.glassfish.hk2.utilities.binding.AbstractBinder;
import persistance.services.*;
import persistance.interfaces.*;

public class ServiceBinder extends AbstractBinder {
    @Override
    protected void configure() {
    	bind(EntityManagerProvider.class).to(EntityManager.class);
        bind(AlmacenamientoDAO.class).to(IAlmacenamiento.class);
        bind(BienDAO.class).to(IBien.class);
        bind(CanalDAO.class).to(ICanal.class);
        bind(FamiliaProductoraDAO.class).to(IFamiliaProductora.class);
        bind(ItemDAO.class).to(IItem.class);
        bind(NotaDAO.class).to(INota.class);
        bind(OrdenDAO.class).to(IOrden.class);
        bind(RecetaDAO.class).to(IReceta.class);
        bind(UsuarioDAO.class).to(IUsuario.class);
    }
}

