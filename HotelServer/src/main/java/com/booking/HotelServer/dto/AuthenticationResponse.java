package com.booking.HotelServer.dto;

import com.booking.HotelServer.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {

    private String jwt;

    private Long userId;

    private UserRole userRole;

}
