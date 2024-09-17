package com.booking.HotelServer.services.admin.rooms;

import com.booking.HotelServer.dto.RoomDto;
import com.booking.HotelServer.dto.RoomResponseDto;

public interface RoomService {

    public boolean postRoom(RoomDto roomDto);

    RoomResponseDto getAllRooms(int pageNumber);

}
