'use client'
import styles from "./page.module.css";
import io from "socket.io-client";
import { useState } from "react";

export default function Home() {

  var socket = io("http://localhost:3001");
  
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  socket.on("chat message", (msg) => {
    setMessages([...messages, msg]);
  });

  const SendMessage = () => {
    socket.emit("chat message", message);
    setMessage("");
  };

  return (
    <div className={styles.page}>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <span>{msg}</span>
          </li>
        ))}
      </ul>
      <input id="m" value={message} onChange={(e) => setMessage(e.target.value)} autoComplete="off" />
      <button onClick={SendMessage}>Send</button>
    </div>
  );
}
