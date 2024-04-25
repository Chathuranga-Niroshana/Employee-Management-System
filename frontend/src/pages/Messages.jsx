import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { EmsContext } from "../context/EmsContext";
import axios from "axios";
import "./Stylesheets/Messages.css";
import moment from "moment";

const socket = io("http://localhost:8080");

const Messages = () => {
  const [messages, setMessages] = useState({});
  const [messageInput, setMessageInput] = useState("");
  const { user, employees } = useContext(EmsContext);
  const [formData, setFormData] = useState({ eid: "" });
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // get messages from db
  useEffect(() => {
    axios
      .get("http://localhost:8080/message")
      .then((res) => {
        const allMessages = res.data;
        const groupedMessages = {};
        allMessages.forEach((message) => {
          const otherPersonId =
            message.sender === user.eid ? message.receiver : message.sender;
          if (!groupedMessages[otherPersonId]) {
            groupedMessages[otherPersonId] = [];
          }
          groupedMessages[otherPersonId].push(message);
        });
        setMessages(groupedMessages);
      })
      .catch((error) => {
        console.error("Error getting messages:", error);
      });
  }, [user.eid]);

  useEffect(() => {
    socket.on("message", (message) => {
      if (message.sender === user.eid || message.receiver === user.eid) {
        setMessages((prevMessages) => {
          const otherPersonId =
            message.sender === user.eid ? message.receiver : message.sender;
          setUnreadMessages((prevUnreadMessages) => ({
            ...prevUnreadMessages,
            [otherPersonId]: true,
          }));
          return {
            ...prevMessages,
            [otherPersonId]: [...(prevMessages[otherPersonId] || []), message],
          };
        });
      }
    });
    return () => {
      socket.off("message");
    };
  }, [user.eid]);

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

  const getEmployeeNameById = (empId) => {
    const employee = employees.find((emp) => emp.eid === empId);
    return employee ? employee.employee_name : "";
  };

  const toggleMessages = (personId) => {
    if (selectedPersonId === personId) {
      setSelectedPersonId(null);
      setUnreadMessages((prevUnreadMessages) => ({
        ...prevUnreadMessages,
        [personId]: false,
      }));
    } else {
      setSelectedPersonId(personId);
      setUnreadMessages((prevUnreadMessages) => ({
        ...prevUnreadMessages,
        [personId]: false,
      }));
    }
  };

  return (
    <div className="messages-container">
      <h1>Messages</h1>
      <div className="messageFirstContainer">
        <div>
          <select
            className="employee-select"
            id="assignEmployeeId"
            name="eid"
            value={formData.eid}
            onChange={handleInputChange}
          >
            {employees.map((emp) => (
              <option key={emp.eid} value={emp.eid}>
                {emp.eid} - {emp.employee_name} - {emp.email}
              </option>
            ))}
          </select>
        </div>
        <textarea
          className="message-input"
          value={messageInput}
          placeholder="Type message here.."
          onChange={(e) => setMessageInput(e.target.value)}
          name=""
          id=""
          maxLength={255}
          cols="30"
          rows="5"
        ></textarea>

        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
      <div className="messagesAll">
        {Object.keys(messages).map((personId) => (
          <div
            className="messageContentCOntainer"
            key={personId}
            onClick={() => toggleMessages(personId)}
          >
            <h2
              id="messagePerson"
              style={{ color: unreadMessages[personId] ? "red" : "inherit" }}
            >
              {getEmployeeNameById(personId)}
            </h2>
            <div
              className={`messageBox ${
                selectedPersonId === personId ? "show" : "hide"
              }`}
            >
              {messages[personId].map((message, index) => (
                <div
                  className={`message ${
                    message.sender === user.eid ? "sent" : "received"
                  }`}
                  key={index}
                >
                  <p id="dateAndTime">
                    {moment(message.date).format("DD/MM/YYYY  HH:MM")}
                  </p>
                  <p className="message-content">{message.message_content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
