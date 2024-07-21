package resourcesRest;

import models.Usuario;
import persistance.interfaces.IUsuario;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

import io.swagger.v3.oas.annotations.tags.Tag;

@Path("/usuario")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Usuario")
public class UsuarioResource {

	@Inject
    private IUsuario service;

    @POST
    public Response create(Usuario model) {
        Usuario created = service.create(model);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Long id) {
        Usuario model = service.getById(id);
        if (model == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(model).build();
    }

    @GET
    public List<Usuario> getAll() {
        return service.getAll();
    }

    @PUT
    public Response update(Usuario model) {
        Usuario updated = service.update(model);
        return Response.ok(updated).build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        service.delete(id);
        return Response.noContent().build();
    }
}

