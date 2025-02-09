'use client'
import io from "socket.io-client";
import { useState } from "react";

export default function Home() {

  var socket = io("http://localhost:3001");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [usernameSetted, setUsernameSetted] = useState(false);
  socket.on("chat message", (msg) => {
    const timestamp = new Date().toLocaleString();
    setMessages([...messages, `${timestamp} | ${msg}`]);
  });

  const SendMessage = () => {
    socket.emit("chat message", username + ": "+message);
    setMessage("");
  };


  return (
    <div>
      {!usernameSetted ? (
        <div>
          <input
            id="username"
            className="form-group"
            placeholder="Enter your username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
          />
          <button className="form-group" onClick={() => {setUsernameSetted(true); socket.emit("register",username)}}>Set Username</button>
        </div>
      ) : (
        <div>
          <ul>
            {messages.slice().reverse().map((msg, index) => (
              <li key={index}>
                <span>{msg}</span>
              </li>
            ))}
          </ul>
          <input
            id="m"
            className="form-group"
            placeholder="Your message:"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete="off"
          />
          <button className="form-group" onClick={SendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}
