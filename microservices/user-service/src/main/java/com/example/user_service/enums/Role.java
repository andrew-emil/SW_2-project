package com.example.user_service.enums;

public enum Role {
    USER("ROLE_USER"),
    ADMIN("ROLE_ADMIN");

    public final String authority;

    Role(String authority){
        this.authority = authority;
    }

    public String getAuthority() {
        return authority;
    }
}
