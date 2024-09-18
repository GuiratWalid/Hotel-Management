package com.booking.HotelServer.controller.customer;

import com.booking.HotelServer.dto.ReservationDto;
import com.booking.HotelServer.services.customer.reservations.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("CustomerReservationController")
@RequiredArgsConstructor
@RequestMapping("/api/customer")
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping("book")
    public ResponseEntity<?> postBooking(@RequestBody ReservationDto reservationDto){
        boolean success = reservationService.postReservation(reservationDto);
        if(success)
            return ResponseEntity.status(HttpStatus.OK).build();
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

}
