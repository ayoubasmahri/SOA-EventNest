import React from "react";
import "./Bottom.css";
import image from "../../../logosoa.png";

function Bottom() {
  return (
    <div className="bottom">
      <div className="namelogo">
        <img src={image} alt="logo" height={150} width={200} />
        <h3>
          {" "}
          <i>Book the auditorium that suits your needs</i>{" "}
        </h3>
      </div>
      {/*
        <div className="info">
          <h3>Contact us:</h3>
          <p>
            <i>Instagram</i>: event_nest_2024
          </p>
          <p>
            <i>Facebook</i>: Event Nest 2024
          </p>
          <p>
            <i>Pinterest</i>: Event_Nest_2024
          </p>
        </div> */}
      <div className="copyright">
        <h1>
          Event<i>Nest</i>
        </h1>
        <h1>© Copyright {new Date().getFullYear()}</h1>
      </div>
    </div>
  );
}

export default Bottom;
