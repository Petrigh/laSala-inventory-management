package resourcesRest;

import models.Ingrediente;
import persistance.interfaces.IItem;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

import io.swagger.v3.oas.annotations.tags.Tag;

@Path("/item")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Item")
public class ItemResource {

	@Inject
    private IItem service;

    @POST
    public Response create(Ingrediente model) {
        Ingrediente created = service.create(model);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Long id) {
        Ingrediente model = service.getById(id);
        if (model == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(model).build();
    }

    @GET
    public List<Ingrediente> getAll() {
        return service.getAll();
    }
    
    @GET
    @Path("/insumos")
    public List<Ingrediente> getInsumos() {
        return service.getInsumos();
    }
    @GET
    @Path("/productos")
    public List<Ingrediente> getProductos() {
        return service.getProductos();
    }
    @GET
    @Path("/materiaPrima")
    public List<Ingrediente> getMatPrim() {
        return service.getMatPrim();
    }

    @PUT
    @Path("/{id}")
    public Response update(Ingrediente model) {
        Ingrediente updated = service.update(model);
        return Response.ok(updated).build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        service.delete(id);
        return Response.noContent().build();
    }
}

