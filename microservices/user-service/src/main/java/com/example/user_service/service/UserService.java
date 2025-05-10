package com.example.user_service.service;

import com.example.user_service.models.User;
import com.example.user_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> listAllUsers(){
        return new ArrayList<>(userRepository.findAll());
    }

    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }
}
