package com.booking.HotelServer.controller.customer;

import com.booking.HotelServer.dto.ReservationDto;
import com.booking.HotelServer.services.customer.reservations.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController("CustomerReservationController")
@RequiredArgsConstructor
@RequestMapping("/api/customer")
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping("reservation")
    public ResponseEntity<?> postBooking(@RequestBody ReservationDto reservationDto){
        boolean success = reservationService.postReservation(reservationDto);
        if(success)
            return ResponseEntity.status(HttpStatus.OK).build();
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/reservations/{userId}/{pageNumber}")
    public ResponseEntity<?> getAllBookingsByUserId(@PathVariable Long userId, @PathVariable int pageNumber){
        try{
            return ResponseEntity.ok(reservationService.getAllReservationsByUserId(userId, pageNumber));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong !");
        }
    }

}
