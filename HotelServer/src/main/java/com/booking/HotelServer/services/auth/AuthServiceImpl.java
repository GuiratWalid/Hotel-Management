package com.booking.HotelServer.services.auth;

import com.booking.HotelServer.dto.SignupRequest;
import com.booking.HotelServer.dto.UserDto;
import com.booking.HotelServer.entity.User;
import com.booking.HotelServer.enums.UserRole;
import com.booking.HotelServer.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    @Value("${ADMIN_PASSWORD}")
    private String adminPassword;

    @PostConstruct
    public void createAnAdminAccount(){
        Optional<User> adminAccount = userRepository.findByUserRole(UserRole.ADMIN);
        if(adminAccount.isEmpty()){
            User user = new User();
            user.setEmail("Guiratwalid98@gmail.com");
            user.setName("Walid");
            user.setUserRole(UserRole.ADMIN);
            user.setPassword(new BCryptPasswordEncoder().encode(adminPassword));
            userRepository.save(user);
            System.out.println("Admin account created successfully !");
        }else{
            System.out.println("Admin account already exist !");
        }
    }

    public UserDto createUser(SignupRequest signupRequest){
        if( userRepository.findFirstByEmail(signupRequest.getEmail()).isPresent()){
            throw new EntityExistsException("User Already Present With email '" + signupRequest.getEmail() + "' !");
        }
        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setName(signupRequest.getName());
        user.setUserRole(UserRole.CUSTOMER);
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        User createdUser = userRepository.save(user);
        return createdUser.getUserDto();
    }

}
