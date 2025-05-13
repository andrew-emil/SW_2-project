package com.example.user_service.controllers;

import com.example.user_service.dtos.LoginDto;
import com.example.user_service.dtos.RegisterDto;
import com.example.user_service.dtos.UserDataDto;
import com.example.user_service.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto registerDto,
                                      BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            Map<String, String> errors = bindingResult.getFieldErrors()
                    .stream()
                    .collect(Collectors.toMap(
                       FieldError::getField,
                       FieldError::getDefaultMessage
                    ));
            return ResponseEntity.badRequest().body(errors);
        }

        authService.register(registerDto);
        return ResponseEntity.ok("User Registered");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto loginDto,
                                   BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            Map<String, String> errors = bindingResult.getFieldErrors()
                    .stream()
                    .collect(Collectors.toMap(
                            FieldError::getField,
                            FieldError::getDefaultMessage
                    ));
            return ResponseEntity.badRequest().body(errors);
        }
        try{
            String token = authService.login(loginDto);
            UserDataDto userData = authService.getUserData(loginDto.getEmail());
            return ResponseEntity.ok().body(Map.of(
                    "token", token,
                    "user", userData
            ));
        }catch (BadCredentialsException e){
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }
}
