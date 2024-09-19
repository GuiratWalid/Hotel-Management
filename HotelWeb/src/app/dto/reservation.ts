export interface Reservation {
    id: number;
    checkInDate: Date;
    checkOutDate: Date;
    price: number | null;
    reservationStatus: string | null;
    roomId: number;
    roomType: string | null;
    roomName: string | null;
    userId: number;
    username: string | null;
}
