package com.booking.HotelServer.services.customer.reservations;

import com.booking.HotelServer.dto.ReservationDto;

public interface ReservationService {

    boolean postReservation(ReservationDto reservationDto);

}
