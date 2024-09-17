package com.booking.HotelServer.repository;

import com.booking.HotelServer.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
