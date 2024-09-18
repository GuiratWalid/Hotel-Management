package com.booking.HotelServer.services.admin.rooms;

import com.booking.HotelServer.dto.RoomDto;
import com.booking.HotelServer.dto.RoomResponseDto;

public interface RoomService {

    boolean postRoom(RoomDto roomDto);

    RoomResponseDto getAllRooms(int pageNumber);

    RoomDto getRoomById(Long id);

    boolean updateRoom(Long id, RoomDto roomDto);

    void deleteRoom(Long id);

}
