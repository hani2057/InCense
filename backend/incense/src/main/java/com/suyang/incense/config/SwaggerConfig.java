package com.suyang.incense.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

/*
* http://localhost:8080/api/swagger-ui/index.html
* */
@Configuration
@EnableWebMvc
public class SwaggerConfig {

  private ApiInfo swaggerInfo() {
    return new ApiInfoBuilder().title("Incense API")
        .description("Incense API Docs").build();
  }

  @Bean
  public Docket swaggerApi() {
    return new Docket(DocumentationType.SWAGGER_2)
        .apiInfo(swaggerInfo()).select()
        .apis(RequestHandlerSelectors.basePackage("com.suyang.incense"))
        .paths(PathSelectors.any())
        .build()
        .useDefaultResponseMessages(false);
  }

}
