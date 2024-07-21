package resourcesRest;

import models.Orden;
import persistance.interfaces.IOrden;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

import io.swagger.v3.oas.annotations.tags.Tag;

@Path("/orden")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Orden")
public class OrdenResource {

	@Inject
    private IOrden service;

    @POST
    public Response create(Orden model) {
        Orden created = service.create(model);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Long id) {
        Orden model = service.getById(id);
        if (model == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(model).build();
    }

    @GET
    public List<Orden> getAll() {
        return service.getAll();
    }

    @PUT
    @Path("/{id}")
    public Response update(Orden model) {
        Orden updated = service.update(model);
        return Response.ok(updated).build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        service.delete(id);
        return Response.noContent().build();
    }
}

