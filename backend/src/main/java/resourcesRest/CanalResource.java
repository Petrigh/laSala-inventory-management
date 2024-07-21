package resourcesRest;

import models.Canal;
import persistance.interfaces.ICanal;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

import io.swagger.v3.oas.annotations.tags.Tag;

@Path("/canal")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Canales")
public class CanalResource {
	
	@Inject
    private ICanal service;

    @POST
    public Response create(Canal model) {
        Canal created = service.create(model);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Long id) {
        Canal model = service.getById(id);
        if (model == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(model).build();
    }

    @GET
    public List<Canal> getAll() {
        return service.getAll();
    }

    @PUT
    @Path("/{id}")
    public Response update(Canal model) {
        Canal updated = service.update(model);
        return Response.ok(updated).build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        service.delete(id);
        return Response.noContent().build();
    }
}

