package persistance.interfaces;

import models.Usuario;
import java.util.List;

import org.jvnet.hk2.annotations.Contract;

@Contract
public interface IUsuario {
    Usuario create(Usuario model);
    Usuario getById(Long id);
    Usuario getByUsuario(String usuario);
    List<Usuario> getAll();
    Usuario update(Usuario model);
    void delete(Long id);
    void activate(Long id);
}

