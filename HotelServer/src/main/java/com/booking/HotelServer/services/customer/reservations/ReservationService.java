package com.booking.HotelServer.services.customer.reservations;

import com.booking.HotelServer.dto.ReservationDto;
import com.booking.HotelServer.dto.ReservationResponseDto;

public interface ReservationService {

    boolean postReservation(ReservationDto reservationDto);

    ReservationResponseDto getAllReservationsByUserId(Long userId, int pageNumber);

}
