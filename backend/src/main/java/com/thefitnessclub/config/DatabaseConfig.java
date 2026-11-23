package com.thefitnessclub.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
public class DatabaseConfig {

    /**
     * Translates standard Render/Heroku `postgres://user:password@host:port/dbname`
     * into standard Spring JDBC connection parameters.
     */
    @Bean
    @Primary
    public DataSource dataSource() {
        String dbUrl = System.getenv("DATABASE_URL");
        if (dbUrl == null || dbUrl.isBlank()) {
            dbUrl = System.getenv("SPRING_DATASOURCE_URL");
        }

        // If not set or already standard jdbc, let H2 or standard Spring property handle it
        if (dbUrl == null || dbUrl.isBlank() || dbUrl.startsWith("jdbc:")) {
            String defaultUrl = (dbUrl != null && !dbUrl.isBlank())
                    ? dbUrl
                    : "jdbc:h2:file:./data/tfc_db;DB_CLOSE_ON_EXIT=FALSE;AUTO_RECONNECT=TRUE;MODE=PostgreSQL";
            return DataSourceBuilder.create()
                    .url(defaultUrl)
                    .username(System.getenv("DB_USERNAME") != null ? System.getenv("DB_USERNAME") : "sa")
                    .password(System.getenv("DB_PASSWORD") != null ? System.getenv("DB_PASSWORD") : "")
                    .build();
        }

        try {
            // Normalize postgresql:// or postgres://
            URI uri = new URI(dbUrl);
            String userInfo = uri.getUserInfo();
            String username = "";
            String password = "";

            if (userInfo != null && userInfo.contains(":")) {
                String[] parts = userInfo.split(":", 2);
                username = parts[0];
                password = parts[1];
            } else if (userInfo != null) {
                username = userInfo;
            }

            int port = uri.getPort() != -1 ? uri.getPort() : 5432;
            String host = uri.getHost();
            String path = uri.getPath(); // e.g. /dbname

            String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + path;
            if (uri.getQuery() != null && !uri.getQuery().isBlank()) {
                jdbcUrl += "?" + uri.getQuery();
            }

            return DataSourceBuilder.create()
                    .url(jdbcUrl)
                    .username(username)
                    .password(password)
                    .driverClassName("org.postgresql.Driver")
                    .build();
        } catch (Exception e) {
            System.err.println("Could not parse DATABASE_URL as URI, using fallback: " + e.getMessage());
            return DataSourceBuilder.create()
                    .url("jdbc:h2:file:./data/tfc_db;DB_CLOSE_ON_EXIT=FALSE;AUTO_RECONNECT=TRUE;MODE=PostgreSQL")
                    .username("sa")
                    .password("")
                    .build();
        }
    }
}
