package com.udb.rrhh.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API de Sistema de Recursos Humanos UDB")
                        .version("1.0")
                        .description("API REST para el Sistema de Gestión de Recursos Humanos de la Universidad Don Bosco")
                        .license(new License().name("Apache 2.0").url("http://springdoc.org")));
    }
}