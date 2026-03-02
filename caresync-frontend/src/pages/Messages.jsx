import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

export default function Messages() {
  const patient = JSON.parse(localStorage.getItem("patient"));
  const [messages, setMessages] = useState([
    { id: 1, from: "Dr. Ahmed Khan", text: "Hi! How are you feeling today?", time: "10:30 AM", avatar: "👨‍⚕️" },
    { id: 2, from: "You", text: "Good morning doctor, I'm feeling better.", time: "10:35 AM", avatar: "👤" },
    { id: 3, from: "Dr. Ahmed Khan", text: "That's great! Continue with your medications.", time: "10:40 AM", avatar: "👨‍⚕️" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);

  const doctors = [
    { id: 1, name: "Dr. Ahmed Khan", specialty: "Cardiologist", avatar: "👨‍⚕️", status: "Online" },
    { id: 2, name: "Dr. Ayesha Ali", specialty: "Neurologist", avatar: "👩‍⚕️", status: "Online" },
    { id: 3, name: "Dr. Imran Zafar", specialty: "Orthopedic", avatar: "👨‍⚕️", status: "Offline" },
  ];

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    const newMsg = {
      id: messages.length + 1,
      from: "You",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      avatar: "👤",
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="dashboard-container">
      <Sidebar patient={patient} />
      <div className="dashboard-main">
        <Navbar patient={patient} />
        <div className="content-section">
          <h1>💬 Messages</h1>
          <div className="messages-container">
            <div className="chat-list">
              <h3>Your Chats</h3>
              {doctors.map((doc) => (
                <div
                  key={doc.id}
                  className="chat-item"
                  onClick={() => setSelectedChat(doc)}
                  style={{
                    backgroundColor: selectedChat?.id === doc.id ? "#e3f2fd" : "#fff",
                    borderLeft: selectedChat?.id === doc.id ? "4px solid #0b63d1" : "4px solid transparent",
                  }}
                >
                  <div className="chat-avatar">{doc.avatar}</div>
                  <div className="chat-info">
                    <h4>{doc.name}</h4>
                    <p>{doc.specialty}</p>
                  </div>
                  <span className={`status ${doc.status.toLowerCase()}`}></span>
                </div>
              ))}
            </div>

            <div className="chat-window">
              {selectedChat ? (
                <>
                  <div className="chat-header">
                    <div className="chat-avatar">{selectedChat.avatar}</div>
                    <div>
                      <h3>{selectedChat.name}</h3>
                      <p className={`status ${selectedChat.status.toLowerCase()}`}>{selectedChat.status}</p>
                    </div>
                  </div>

                  <div className="messages">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`message ${msg.from === "You" ? "sent" : "received"}`}>
                        <div className="msg-avatar">{msg.avatar}</div>
                        <div className="msg-content">
                          <p>{msg.text}</p>
                          <span className="msg-time">{msg.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="message-input-group">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      className="message-input"
                    />
                    <button onClick={sendMessage} className="send-btn">Send</button>
                  </div>
                </>
              ) : (
                <div className="empty-card">
                  <p>👋 Select a doctor to start conversation</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
