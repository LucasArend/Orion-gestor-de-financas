package com.t2.apiorion.categoria;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CategoriaSeeder {

    @Bean
    CommandLineRunner initCategorias(CategoriaRepository categoriaRepository) {
        return args -> {
            if (categoriaRepository.findByNomeAndUsuarioIsNull("Metas").isEmpty()) {
                Categoria metas = new Categoria();
                metas.setNome("Metas");
                metas.setUsuario(null); // categoria global, sem dono
                categoriaRepository.save(metas);
                System.out.println("✅ Categoria global 'Metas' criada automaticamente.");
            }
        };
    }
}
