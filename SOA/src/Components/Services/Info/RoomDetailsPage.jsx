import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./RoomDetailsPage.css";
import mail from "./mail";
import {
  UserContext,
  UserProvider,
} from "../../Services/Auth/context/userContext";

function RoomDetailsPage() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showChat, setShowChat] = useState(false); // State to show/hide chat
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext); // Access the authenticated user from context
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reservationMessage, setReservationMessage] = useState("");
  const [selectedServices, setSelectedServices] = useState([]); // State to store selected services
  console.log(user.user.email);
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/posts/${id}`
        );
        setRoom(response.data.post);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };
    fetchRoomDetails();
  }, [id]);

  if (!room) {
    return <div>Loading...</div>;
  }

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % allPhotos.length;
    setCurrentImageIndex(nextIndex);
  };

  const handlePrevImage = () => {
    const prevIndex =
      currentImageIndex === 0 ? allPhotos.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
  };

  const handleChatButtonClick = () => {
    setShowChat(!showChat); // Toggle showChat state
  };

  const handleSendEmail = () => {
    const subject = "Chat about room";
    const recipientEmail = room.owner + "@gmail.com";
    console.log(recipientEmail);

    // Construct the email body
    const body = `Hi, I'm interested in chatting about the room. Can we discuss further? Email: ${user.user.email}. Message: ${message}`;

    // Generate mailto link
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open default email client with mailto link
    window.location.href = mailtoLink;
    alert("email sent");
  };

  if (!room) {
    return <div>Loading...</div>;
  }

  const allPhotos = [room.photo1, room.photo2].flat();

  const handleReservation = async () => {
    if (!startDate || !endDate) {
      setReservationMessage("Please select both start and end dates.");
      return;
    }
    try {
      await axios.post(`http://localhost:3001/api/Reserve`, {
        post: room._id,
        creator: user.user._id,
        dateStart: startDate.toISOString(),
        dateEnd: endDate.toISOString(),
      });
      setReservationMessage("Reservation successful!");
    } catch (error) {
      console.error("Error making reservation:", error);
      setReservationMessage("Please chose another date range.");
    }
  };
  // Calculate total price

  const hours = Math.abs(endDate - startDate) / 36e5;

  const totalPrice =
    room.price_per_hour * hours +
    selectedServices.reduce((total, service) => total + service.price, 0);

  return (
    <div className="room-details-container">
      <div className="room-info">
        <h2 id="titre">{room.title}</h2>
        <div>
          <span id="titre">Location: </span>
          <span id="valuess">{room.location}</span>
        </div>
        <div>
          <span id="titre">Price per Hour: </span>
          <span id="valuess">{room.price_per_hour} MAD/hour</span>
        </div>
        <div>
          <span id="titre">Owned by: </span>
          <span id="valuess">{room.owner}</span>
        </div>
        <div>
          <span id="titre">Size: </span>
          <span id="valuess">{room.size}</span>
        </div>
        <div>
          <span id="titre">Capacity: </span>
          <span id="valuess">{room.capacity}</span>
        </div>
        <div>
          <span id="titre">Description: </span>
          <span id="valuess">{room.description}</span>
        </div>
        <div>
          <span id="titre">Services: </span>
          {room.services.map((service, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={service._id}
                onChange={() =>
                  setSelectedServices((prevServices) =>
                    prevServices.includes(service)
                      ? prevServices.filter((s) => s !== service)
                      : [...prevServices, service]
                  )
                }
              />
              <label htmlFor={service._id}>
                {service.name} : {service.price} MAD
              </label>
            </div>
          ))}
        </div>
        <br />
      </div>
      <div className="room-image">
        <img src={allPhotos[currentImageIndex]} alt={room.name} />
        {allPhotos.length > 1 && (
          <>
            <button id="prev-image" onClick={handlePrevImage}>
              &lt;
            </button>
            <button id="next-image" onClick={handleNextImage}>
              &gt;
            </button>
          </>
        )}

        <div className="reservation-container">
          <h3>Reserve this room</h3>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            dateFormat="MMMM d, yyyy h:mm aa"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            dateFormat="MMMM d, yyyy h:mm aa"
          />

          {reservationMessage && <p>{reservationMessage}</p>}
        </div>
        <p>Total Price: {totalPrice} MAD</p>
        <div>
          <button className="reserever-button" onClick={handleReservation}>
            Reserve
          </button>
          <button className="reserever-button" onClick={handleChatButtonClick}>
            {showChat ? "Hide Chat" : "Chat"}
          </button>
          {showChat && (
            <div className="email-form">
              <span>FROM: {user.user.email}</span>
              <textarea
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button className="reserever-button" onClick={handleSendEmail}>
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RoomDetailsPage;
