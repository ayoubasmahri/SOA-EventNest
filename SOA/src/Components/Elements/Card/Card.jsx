// Card.js
import React from "react";
import "./Card.css";
import { Link } from "react-router-dom"; 

function Card({ room }) {
  return (
    <div className="card">
      <img
        src={room.photo1}
        width={300}
        height={300}
        alt={room.name} // Assuming your room object has a field named title for the room title
      />
      <div className="card-content">
        <h3>{room.title}</h3>
        <p> {room.location}</p>{" "}
        {/* Assuming your room object has a field named location */}
        <p>{room.price_per_hour} MAD/hour</p>{" "}
        {/* Assuming your room object has a field named price */}
        <p>Owned by :{room.owner}</p>{" "}
        {/* Assuming your room object has a field named owner */}

        <Link to={`/rooms/${room._id}`}>
          <button>Details</button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
