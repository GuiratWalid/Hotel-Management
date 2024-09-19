package com.booking.HotelServer.controller.admin;

import com.booking.HotelServer.services.admin.reservations.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("AdminReservationController")
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class ReservationController {

    private final ReservationService reservationService;

    @GetMapping("/reservations/{pageNumber}")
    public ResponseEntity<?> getAllReservations(@PathVariable int pageNumber){
        try{
            return ResponseEntity.ok(reservationService.getAllReservations(pageNumber));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Samething went wrong !");
        }
    }

}
