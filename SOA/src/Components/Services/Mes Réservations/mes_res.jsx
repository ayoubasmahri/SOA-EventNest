import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../../Services/Auth/context/userContext";
import "./UserReservations.css";

function UserReservations() {
  const user = useContext(UserContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (user && user.user && user.user.user) {
      const reservationIds = user.user.user.reservations || [];
      if (reservationIds.length > 0) {
        fetchReservationsData(reservationIds);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchReservationsData = async (reservationIds) => {
    try {
      const reservationsData = await Promise.all(
        reservationIds.map(async (reservationId) => {
          const response = await axios.get(`/api/Reserve/${reservationId}`);
          const reservation = response.data.reservation;

          const postResponse = await axios.get(`/api/posts/${reservation.post}`);
          const post = postResponse.data.post;

          return { ...reservation, post };
        })
      );
      setReservations(reservationsData);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="reservations-container">
      <h1>Your Reservations</h1>
      <div className="reservations-list">
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <div key={reservation._id} className="reservation-card">
              {reservation.post.photo1 && (
                <img src={reservation.post.photo1} alt={reservation.post.title} className="post-photo" />
              )}
              <div className="reservation-info">
                <p><strong>Date Start:</strong> {new Date(reservation.dateStart).toLocaleString()}</p>
                <p><strong>Date End:</strong> {new Date(reservation.dateEnd).toLocaleString()}</p>
              </div>
              <div className="post-info">
                <h3>Reservation Details:</h3>
                <p><strong>Title:</strong> {reservation.post.title}</p>
                <p><strong>Location:</strong> {reservation.post.location}</p>
                <p><strong>Price per Hour:</strong> {reservation.post.price_per_hour} MAD/hour</p>
                <p><strong>Size:</strong> {reservation.post.size}</p>
                <p><strong>Capacity:</strong> {reservation.post.capacity}</p>
                <p><strong>Description:</strong> {reservation.post.description}</p>
                <p><strong>Owner:</strong> {reservation.post.owner}</p>
                <div>
                  <h4>Services:</h4>
                  {reservation.post.services.map((service, index) => (
                    <div key={index}>
                      <p>{service.name}: {service.price} MAD</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No reservations found.</p>
        )}
      </div>
    </div>
  );
}

export default UserReservations;
