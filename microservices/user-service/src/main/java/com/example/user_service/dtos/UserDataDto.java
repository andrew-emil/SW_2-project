package com.example.user_service.dtos;

import com.example.user_service.enums.Role;

public class UserDataDto {

    private Long id;

    private String username;

    private Role role;

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public Role getRole() {
        return role;
    }

    public UserDataDto(Long id, String username, Role role) {
        this.id = id;
        this.username = username;
        this.role = role;
    }
}