package com.booking.HotelServer.services.customer.reservations;

import com.booking.HotelServer.dto.ReservationDto;
import com.booking.HotelServer.entity.Reservation;
import com.booking.HotelServer.entity.Room;
import com.booking.HotelServer.entity.User;
import com.booking.HotelServer.enums.ReservationStatus;
import com.booking.HotelServer.repository.ReservationRepository;
import com.booking.HotelServer.repository.RoomRepository;
import com.booking.HotelServer.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service("CustomerReservationService")
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService{

    private final ReservationRepository reservationRepository;

    private final UserRepository userRepository;

    private final RoomRepository roomRepository;

    public boolean postReservation(ReservationDto reservationDto){
        Optional<User> optionalUser = userRepository.findById(reservationDto.getUserId());
        Optional<Room> optionalRoom = roomRepository.findById(reservationDto.getRoomId());

        if(optionalRoom.isPresent() && optionalUser.isPresent()){
            Reservation reservation = new Reservation();
            reservation.setRoom(optionalRoom.get());
            reservation.setUser(optionalUser.get());
            reservation.setCheckInDate(reservationDto.getCheckInDate());
            reservation.setCheckOutDate(reservationDto.getCheckOutDate());
            reservation.setReservationStatus(ReservationStatus.PENDING);

            Long days = ChronoUnit.DAYS.between(reservationDto.getCheckInDate(), reservationDto.getCheckOutDate());
            reservation.setPrice(optionalRoom.get().getPrice() * days);

            reservationRepository.save(reservation);
            return true;
        }
        return false;
    }

}
