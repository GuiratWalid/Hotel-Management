import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../../auth/services/storage/user-storage.service';
import { Reservation } from '../../../dto/reservation';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAvailableRooms(pageNumber: number): Observable<any>{
    return this.http.get(BASIC_URL + `api/customer/rooms/${pageNumber}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  bookRoom(reservationDto: Reservation): Observable<any>{
    return this.http.post(BASIC_URL + `api/customer/reservation`, reservationDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getUserBookings(pageNumber: number): Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/customer/reservations/${userId}/${pageNumber}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  createAuthorizationHeader(){
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      "Authorization",
      "Bearer " + UserStorageService.getToken(),
    )
  }

}
