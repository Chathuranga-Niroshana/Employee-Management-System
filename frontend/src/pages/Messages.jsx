import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { EmsContext } from "../context/EmsContext";
import axios from "axios";

const socket = io("http://localhost:8080");

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const { user, employees } = useContext(EmsContext);
  const [formData, setFormData] = useState({ eid: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // get messeges from db
  useEffect(() => {
    axios
      .get("http://localhost:8080/message")
      .then((res) => {
        const allMesseges = res.data;
        const userMessages = allMesseges.filter(
          (message) =>
            message.sender === user.eid || message.receiver === user.eid
        );
        setMessages(userMessages);
      })
      .catch((error) => {
        console.error("Error getting messages:", error);
      });
  }, [messages]);

  // Listen for new messages
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  // Function to send a message
  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      const receiverId = formData.eid;
      socket.emit("message", {
        message_content: messageInput,
        sender: user.eid,
        receiver: receiverId,
      });
      setMessageInput("");
    }
  };

  return (
    <div>
      <h1>Messages</h1>
      <textarea
        value={messageInput}
        placeholder="Type message here.."
        onChange={(e) => setMessageInput(e.target.value)}
        name=""
        id=""
        maxLength={255}
        cols="30"
        rows="5"
      ></textarea>
      <div>
        TO:
        <select
          id="assignEmployeeId"
          name="eid"
          value={formData.eid}
          onChange={handleInputChange}
        >
          {employees.map((emp) => (
            <option key={emp.eid} value={emp.eid}>
              {emp.eid} - {emp.employee_name} -{emp.email}
            </option>
          ))}
        </select>
      </div>
      <button onClick={sendMessage}>Send</button>

      <section>
        {messages.length === 0 ? (
          <div>
            <h1>You have no messages</h1>
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={index}>
              <h1>
                {message.message_content} - {message.sender} -{message.receiver}
              </h1>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Messages;
