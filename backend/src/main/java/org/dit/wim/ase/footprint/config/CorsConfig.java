//package org.dit.wim.ase.footprint.config;//package org.dit.wim.ase.footprint.config;
////
////import org.dit.wim.ase.footprint.repo.Userrepo;
////import org.springframework.context.annotation.Bean;
////import org.springframework.context.annotation.Configuration;
////import org.springframework.security.config.Customizer;
////import org.springframework.security.config.annotation.web.builders.HttpSecurity;
////import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
////import org.springframework.security.core.userdetails.UserDetailsService;
////import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
////import org.springframework.security.crypto.password.PasswordEncoder;
////import org.springframework.security.web.SecurityFilterChain;
////
////@Configuration
////@EnableWebSecurity
//
////public class securityconfig {
////    @Bean
////    public PasswordEncoder passwordEncoder() {
////        return new BCryptPasswordEncoder();
////    }
////    @Bean
////    public UserDetailsService userDetailsService(Userrepo repo, PasswordEncoder enc) {
////        return username-> repo.findByUsername(username).asUserDetails(enc);
////    }
//
//
//
//
////  @Bean
////    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
////
////        http.authorizeHttpRequests(requests -> requests
////                                .requestMatchers("/method/**" ).hasRole("ADMIN")
////                                .requestMatchers("/users/**").hasRole("ADMIN")
////                                .requestMatchers("/signup").hasAnyRole("ADMIN", "USER")
////                                .requestMatchers("/").hasAnyRole("ADMIN", "USER")
////                .anyRequest().authenticated()
////                ).httpBasic(Customizer.withDefaults())
////                .formLogin(Customizer.withDefaults())
////                .logout(Customizer.withDefaults());
////
////      return http.build();
////    }
////}
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import java.util.List;
//
//@Configuration
//public class CorsConfig {
//
//    @Bean
//    public CorsConfigurationSource corsConfigurationSourceex() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(List.of("http://localhost:3000", "http://yourfrontend.com"));
//        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
//        configuration.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
//}
//
