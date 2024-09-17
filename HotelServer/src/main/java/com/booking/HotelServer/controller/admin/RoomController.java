package com.booking.HotelServer.controller.admin;

import com.booking.HotelServer.dto.RoomDto;
import com.booking.HotelServer.services.admin.rooms.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping("/room")
    public ResponseEntity<?> postRoom(@RequestBody RoomDto roomDto){
        boolean success = roomService.postRoom(roomDto);
        if(success)
            return ResponseEntity.status(HttpStatus.OK).build();
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/rooms/{pageNumber}")
    public ResponseEntity<?> getAllRooms(@PathVariable int pageNumber){
        return ResponseEntity.ok(roomService.getAllRooms(pageNumber));
    }

}
