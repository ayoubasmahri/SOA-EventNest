/*import React, { useState, useEffect, useContext } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { UserContext } from "./Services/Auth/context/userContext";
import "./chat.css";

const Chat = ({ roomId }) => {
  const { user } = useContext(UserContext); // Access authenticated user from context
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, `rooms/${roomId}/messages`),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => {
      unsubscribe();
    };
  }, [roomId]);

  const handleSendMessage = async () => {
    if (!user) {
      // User is not authenticated, handle accordingly
      console.error("User is not authenticated");
      return;
    }

    if (newMessage.trim() === "") return;
    try {
      console.log(roomId);
      console.log(user);
      console.log(user.id);
      console.log(user.name);
      await addDoc(collection(db, `rooms/${roomId}/messages`), {
        text: newMessage,
        timestamp: new Date(),
        userId: user.id,
        userName: user.name,
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error adding message: ", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.userId === user?.uid ? "own" : ""}`}
          >
            <span>{message.userName}: </span>
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
*/
