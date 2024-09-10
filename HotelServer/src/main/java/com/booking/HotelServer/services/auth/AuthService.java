package com.booking.HotelServer.services.auth;

import com.booking.HotelServer.dto.SignupRequest;
import com.booking.HotelServer.dto.UserDto;

public interface AuthService {

    public UserDto createUser(SignupRequest signupRequest);

}
