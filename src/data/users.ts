
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bookings: Booking[];
  wishlist: string[]; // movie ids
}

export interface Booking {
  id: string;
  movieId: string;
  theaterId: string;
  showTimeId: string;
  seats: string[];
  totalAmount: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled';
  qrCode: string;
}

export const currentUser: User = {
  id: "user1",
  name: "John Smith",
  email: "john@example.com",
  phone: "555-123-4567",
  bookings: [
    {
      id: "booking1",
      movieId: "3",
      theaterId: "1",
      showTimeId: "st4",
      seats: ["A1", "A2"],
      totalAmount: 36,
      bookingDate: "2023-07-10",
      status: "confirmed",
      qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAACkCAYAAAAZtYVBAAAAAklEQVR4AewaftIAAAOaSURBVO3BQY4kMQwDwWSh/3+Z62OeChBkj7vTIcYv1hgfWWN8ZI3xkTXGR9YYH1ljfGSN8ZE1xkfWGB9ZY3xkjfGRNcZH1hgfWWN8ZI3xkTXGRzbpIiFl6CYhZeimhJShm4SUoZuElKGbhJShm4SUoZuElKGbhJShm4SUoZuElKGbhJShm4SUoZs1xkfWGB9ZY3xkjfGRTd7kDXSSN0hIGbpJSBl6g4SUoTd4g4SUoZuElKE3eIM3SBm6SRm6WWN8ZI3xkTXGRzb5CSlDNwkpQzcJKUM3CSlDJwkpQzcJKUMnCSlDNwkpQzcJKUMnCSlDNwkpQzcJKUM3CSlDN2uMj6wxPrLG+Mgm/7GElKGbhJShlIGUoZuElKGThJShlIGUoZOElKE3SEgZuln/mDXGR9YYH1ljfGSTL0tIGTpJSBm6SUgZOknef8pAytBNQsrQTULK0ElCytBNQsrQTULK0M0a4yNrjI+sMT6yyZclpAzd/GUJKUMnCSlDNwkpQzcJKUMnCSlDNwkpQzcJKUM3a4yPrDE+ssb4yCZvkJAydJOQMnSTkDJ0kpAydJKQMnSTkDJ0kpAy9AYJKUMnCSlDNwkpQzcJKUM3CSlDN2uMj6wxPrLG+MgmLyWkDJ0kpAydJKQMnSSkDJ0kpAydJKQM3fxlCSlDJwkpQycJKUM3a4yPrDE+ssb4yCbDf0RCytDNGySkDJ0kpAzd/MdShm7WGB9ZY3xkjfGRTb4sIWXoJiFlKGUgZeimTBk6SUgZShlIGTpJSBlKGUgZOklIGbpZY3xkjfGRNcZHNnmDhJShm4SUN3iDhJShm4SUoZuElKE3SEgZuklIGbpJSBm6SUgZuklIGbpZY3xkjfGRNcZHNukmIWXoJCFl6CYhZegkIWXoJCFl6CYhZegkIWXoJiFlKGUgZegkIWXoJiFl6CYhZehmjfGRNcZH1hgfWWN8ZI3xkTXGR9YYH1ljfGSN8ZE1xkfWGB9ZY3xkjfGRNcZH1hgfWWN8ZI3xkTXGR34B6s4Jcad1zvoAAAAASUVORK5CYII="
    }
  ],
  wishlist: ["2", "5"]
};
