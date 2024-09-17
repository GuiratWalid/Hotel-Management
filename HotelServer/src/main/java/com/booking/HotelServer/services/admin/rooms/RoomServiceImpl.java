package com.booking.HotelServer.services.admin.rooms;

import com.booking.HotelServer.dto.RoomDto;
import com.booking.HotelServer.entity.Room;
import com.booking.HotelServer.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService{

    private final RoomRepository roomRepository;

    public boolean postRoom(RoomDto roomDto){
        try{
            Room room = new Room();
            room.setName(roomDto.getName());
            room.setPrice(roomDto.getPrice());
            room.setName(roomDto.getName());
            room.setAvailable(roomDto.getAvailable());
            roomRepository.save(room);
            return true;
        } catch(Exception e){
            return false;
        }
    }

}
