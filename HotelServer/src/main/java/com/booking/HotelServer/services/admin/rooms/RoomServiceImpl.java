package com.booking.HotelServer.services.admin.rooms;

import com.booking.HotelServer.dto.RoomDto;
import com.booking.HotelServer.dto.RoomResponseDto;
import com.booking.HotelServer.entity.Room;
import com.booking.HotelServer.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    public boolean postRoom(RoomDto roomDto) {
        try {
            Room room = new Room();
            room.setName(roomDto.getName());
            room.setPrice(roomDto.getPrice());
            room.setType(roomDto.getType());
            room.setAvailable(roomDto.getAvailable());
            roomRepository.save(room);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public RoomResponseDto getAllRooms(int pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber, 6);
        Page<Room> roomPage = roomRepository.findAll(pageable);
        RoomResponseDto roomResponseDto = new RoomResponseDto();
        roomResponseDto.setPageNumber(roomPage.getPageable().getPageNumber());
        roomResponseDto.setTotalPages(roomPage.getTotalPages());
        roomResponseDto.setRoomDtoList(roomPage.stream().map(Room::getRoomDto).collect(Collectors.toList()));
        return roomResponseDto;
    }

}
