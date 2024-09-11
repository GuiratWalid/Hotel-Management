package com.booking.HotelServer.dto;

import lombok.Data;

@Data
public class AuthenticationRequest {

    private String email;

    private String password;

}
