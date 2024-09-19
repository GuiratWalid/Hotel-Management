package com.booking.HotelServer.services.admin.reservations;

import com.booking.HotelServer.dto.ReservationResponseDto;

public interface ReservationService {

    ReservationResponseDto getAllReservations(int pageNumber);

}
