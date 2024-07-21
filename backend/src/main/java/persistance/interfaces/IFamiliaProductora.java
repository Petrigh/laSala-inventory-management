package persistance.interfaces;

import models.FamiliaProductora;
import java.util.List;

import org.jvnet.hk2.annotations.Contract;

@Contract
public interface IFamiliaProductora {
    FamiliaProductora create(FamiliaProductora model);
    FamiliaProductora getById(Long id);
    List<FamiliaProductora> getAll();
    FamiliaProductora update(FamiliaProductora model);
    void delete(Long id);
}

