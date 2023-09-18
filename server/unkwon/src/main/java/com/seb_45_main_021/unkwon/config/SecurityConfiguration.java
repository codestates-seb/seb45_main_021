package com.seb_45_main_021.unkwon.config;
import com.seb_45_main_021.unkwon.auth.filter.ExceptionHandlerFilter;
import com.seb_45_main_021.unkwon.auth.filter.JwtAuthenticationFilter;
import com.seb_45_main_021.unkwon.auth.filter.JwtVerificationFilter;
import com.seb_45_main_021.unkwon.auth.handler.UserAccessDeniedHandler;
import com.seb_45_main_021.unkwon.auth.handler.UserAuthenticationFailureHandler;
import com.seb_45_main_021.unkwon.auth.handler.UserAuthenticationSuccessHandler;
import com.seb_45_main_021.unkwon.auth.jwt.JwtTokenizer;
import com.seb_45_main_021.unkwon.auth.utils.CustomAuthorityUtils;
import com.seb_45_main_021.unkwon.heart.repository.PortfolioHeartRepository;
import com.seb_45_main_021.unkwon.heart.repository.ProjectHeartRepository;
import com.seb_45_main_021.unkwon.member.repository.MemberRepository;
import com.seb_45_main_021.unkwon.oauth.handler.OAuth2LoginFailureHandler;
import com.seb_45_main_021.unkwon.oauth.handler.OAuth2LoginSuccessHandler;
import com.seb_45_main_021.unkwon.oauth.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;
    private final MemberRepository memberRepository;
    private final PortfolioHeartRepository portfolioHeartRepository;
    private final ProjectHeartRepository projectHeartRepository;
    private final UserAccessDeniedHandler userAccessDeniedHandler;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(Customizer.withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .apply(new CustomFilterConfigurer())
                .and()
                .exceptionHandling().accessDeniedHandler(userAccessDeniedHandler)
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        // .antMatchers(HttpMethod.OPTIONS).permitAll() // preflight 요청은 OPTIONS 메서드를 사용하기 때문에  허용
                        .antMatchers("/portfolios/**", "/projects/**", "/members/**", "/projectcards/**", "/oauth2/**", "/h2/**").permitAll()
                        .antMatchers("/portfolio/**", "/project/**").permitAll()
                        .antMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-resources/**", "/swagger-ui.html", "/webjars/**").permitAll()
                        .anyRequest().authenticated());
//                .oauth2Login()
//                .successHandler(oAuth2LoginSuccessHandler)
//                .failureHandler(oAuth2LoginFailureHandler)
//                .userInfoEndpoint() // OAuth2 로그인 성공 이후 사용자 정보를 가져올 설정
//                .userService(customOAuth2UserService);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    // CORS 정책
    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        // 모든 출처에 대한 스크립트 기반 HTTP 통신 허용
        configuration.setAllowedOrigins(Arrays.asList("*"));
        // HTTP 메서드에 대한 HTTP 통신 허용
        configuration.setAllowedMethods(Arrays.asList("POST", "GET", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(List.of(
                "accessToken",
                "refreshToken"
        )); // 응답 헤더 설정

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // 모든 URL 에 앞에서 구성한 CORS 정책 적용
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity>{
        @Override
        public void configure(HttpSecurity builder) throws Exception{
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler(jwtTokenizer, memberRepository, portfolioHeartRepository, projectHeartRepository));
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);
            ExceptionHandlerFilter exceptionHandlerFilter = new ExceptionHandlerFilter(jwtTokenizer);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    // 사용자가 로그인 후 request 에 Jwt 가 포함되어 있을 경우 동작
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class)
                    .addFilterBefore(exceptionHandlerFilter, JwtVerificationFilter.class);
        }
    }
}
