import React, { useState } from "react";
import "./publier.css";
import { firebaseConfig } from "../../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { UserContext,UserProvider } from "../../Services/Auth/context/userContext";
import { useContext } from "react";
import axios from "axios";

function Publier() {
  const user = useContext(UserContext);
  console.log(user);
  const [services, setServices] = useState([]);

  const handleAddService = () => {
    setServices([...services, { name: "", price: "" }]);
  };

  const handleChange = (event, index) => {
    const updatedServices = [...services];
    updatedServices[index][event.target.name] = event.target.value;
    setServices(updatedServices);
  };

  const handleRemoveService = (index) => {
    if (services.length > 1) {
      const updatedServices = [...services];
      updatedServices.splice(index, 1);
      setServices(updatedServices);
    }
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [size, setSize] = useState("");
  const [capacity, setCapacity] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoFile2, setPhotoFile2] = useState(null);

  // Initialize Firebase app
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  // Get a reference to the storage service
  const storage = firebase.storage();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleLocalisation = (e) => {
    setLocalisation(e.target.value);
  };

  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const handleCapacity = (e) => {
    setCapacity(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };
  const handlePhotoChange2 = (e) => {
    setPhotoFile2(e.target.files[0]);
  };

  const handlePublish = async () => {
    try {
      // Check if photoFile is not null
      if (!photoFile || !photoFile2) {
        throw new Error("Please select photos.");
      }

      // Upload photo to Firebase Storage
      const photoRef2 = storage.ref().child(`photos/${photoFile2.name}`);
      await photoRef2.put(photoFile2);
      const photoUrl2 = await photoRef2.getDownloadURL();

      const photoRef = storage.ref().child(`photos/${photoFile.name}`);
      await photoRef.put(photoFile);
      const photoUrl = await photoRef.getDownloadURL();

      // Send request to create post
      const response = await axios.post("http://localhost:3001/api/Create", {
        title: name,
        description:description,
        price_per_hour: price,
        location: localisation,
        owner: user.user.user.name,
        owner_id : user.user.user._id,
        size:size,
        capacity:capacity,
        photo1: photoUrl,
        photo2: photoUrl2,
        services: services.map((service) => ({
            name: service.name,
            price: service.price,
          })),
      });

      if (response.status === 201) {
        alert("Room added successfully");
      } else {
        throw new Error("Failed to publish room");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };
  return (
    <div>
      <h1>Publier</h1>
      <div className="userinput">
        <input
          type="text"
          placeholder=" Name..."
          className="fieldss"
          onChange={handleName}
        />
        <input
          type="text"
          placeholder="Description..."
          className="fieldss"
          onChange={handleDescription}
        />
        <input
          type="text"
          placeholder="Price per hour..."
          className="fieldss"
          onChange={handlePrice}
        />
        <input
          type="text"
          placeholder="Localisation..."
          className="fieldss"
          onChange={handleLocalisation}
        />
        <input
          type="text"
          placeholder="Size in m2..."
          className="fieldss"
          onChange={handleSize}
        />
        <input
          type="text"
          placeholder="Max capacity..."
          className="fieldss"
          onChange={handleCapacity}
        />
        <span>Photo Principale:</span>
        <span>Photos Secondaire:</span>
        <input
          type="file"
          accept="image/*"
          className="fieldss"
          onChange={handlePhotoChange}
        />
        <input
          type="file"
          accept="image/*"
          className="fieldss"
          onChange={handlePhotoChange2}
        />{" "}
        {services.map((service, index) => (
          <div key={index}>
            <label htmlFor={`service-name-${index}`}>Service Name:</label>
            <input
              type="text"
              id={`service-name-${index}`}
              name="name"
              value={service.name}
              onChange={(event) => handleChange(event, index)}
              placeholder="Enter Service Name"
              className="fieldss"
            />
            <br />
            <label htmlFor={`service-price-${index}`}>Price per Service:</label>
            <input
              type="number"
              id={`service-price-${index}`}
              name="price"
              value={service.price}
              onChange={(event) => handleChange(event, index)}
              placeholder="Enter Price"
              className="fieldss"
            />

            {services.length > 1 && (
              <button onClick={() => handleRemoveService(index)}>
                Remove Service
              </button>
            )}
          </div>
        ))}
      </div>
      <button className="Publish" onClick={handlePublish}>
        Publish
      </button>
      <button onClick={handleAddService} className="Publish">
        Add Service
      </button>
    </div>
  );
}

export default Publier;
