package resourcesRest;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
    info = @Info(
        title = "API de Gestión de Almacenamiento",
        version = "1.0",
        description = "Esta API proporciona endpoints para la gestión de La Sala, incluyendo operaciones CRUD para recursos de almacenamiento, usuarios, canales de venta y ordenes.",
        contact = @Contact(
            name = "Grupo 1",
            url = "https://gitlab.catedras.linti.unlp.edu.ar/jyaa_2024/jyaa2024_grupo1"
        ),
        license = @License(
            name = "Apache 2.0",
            url = "https://www.apache.org/licenses/LICENSE-2.0.html"
        )
    ),
    servers = {
        @Server(
            url = "http://localhost:8080/backend/rest",
            description = "localhost"
        ),
        @Server(
            url = "https://grupo1.java2024.linti.unlp.edu.ar/rest",
            description = "Servidor Catedras"
        )
    }
)
public class OpenAPIConfig {

}
