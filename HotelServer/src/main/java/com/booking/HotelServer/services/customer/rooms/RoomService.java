package com.booking.HotelServer.services.customer.rooms;

import com.booking.HotelServer.dto.RoomResponseDto;

public interface RoomService {

    RoomResponseDto getAvailableRooms(int pageNumber);

}
