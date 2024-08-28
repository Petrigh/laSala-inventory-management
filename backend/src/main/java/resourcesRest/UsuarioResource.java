package resourcesRest;

import models.UserFront;
import models.Usuario;
import persistance.interfaces.IKeyManager;
import persistance.interfaces.IUsuario;
import jakarta.inject.Inject;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.Date;
import java.util.List;

import io.jsonwebtoken.Jwts;
import io.swagger.v3.oas.annotations.tags.Tag;

@Path("/usuario")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Usuario")
public class UsuarioResource {
	@Inject
    private IUsuario service;
	@Inject
	private IKeyManager keyManager;

    @POST
    public Response create(Usuario model) {
		JsonObject json;
    	try {
    		Usuario dbUser = service.getByUsuario(model.getUsuario());
    		if(dbUser != null) {
    			throw new RuntimeException("Usuario ya existe");
    		}
            Usuario created = service.create(model);
            return Response.status(Response.Status.CREATED).entity(created).build();
    	}catch (Exception e) {
			json = Json.createObjectBuilder().add("error", e.getMessage()).build();
			return Response.status(422).entity(json).build();    		
    	}
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
    @Path("/roles")
    public Response getRolesColab() {
        return Response.ok(Usuario.Rol.values()).build();
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

    @PUT
    @Path("/activate/{id}")
    public Response activate(@PathParam("id") Long id) {
        service.activate(id);
        return Response.noContent().build();
    }
    

	@POST
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(UserFront usuario) {
		boolean status = false;
		JsonObject json;
		try {
			Usuario dbUser = service.getByUsuario(usuario.getUsuario());
			if(dbUser == null) {
				throw new RuntimeException("Usuario o Contraseña Invalido");
			}
			if(!dbUser.checkPassword(usuario.getPassword())) {
				throw new RuntimeException("Usuario o Contraseña Invalido");				
			}
			if(!dbUser.isActive()) {
				throw new RuntimeException("Su cuenta esta desactivada");				
			}
			String jwt = Jwts.builder()
				.claim("rol", dbUser.getRol().toString())
				.claim("nombre", dbUser.getNombre()+' '+dbUser.getApellido())
				.subject(usuario.getUsuario())
				.issuedAt(new Date())
				.signWith(keyManager.getKey())
				.compact();
			json = Json.createObjectBuilder().add("JWT", jwt).build();
			return Response.status(Response.Status.CREATED).entity(json).build();	
			
		}catch(Exception e){
			json = Json.createObjectBuilder().add("error", e.getMessage()).build();
			return Response.status(Response.Status.UNAUTHORIZED).entity(json).build();
		}	
	}
}

