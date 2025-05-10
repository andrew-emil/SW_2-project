package com.example.user_service.enums;

import org.springframework.security.core.userdetails.UserDetails;

public interface UserDetailsService {
    public UserDetails loadUserByEmail(String email);
}
