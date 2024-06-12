import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider";
import axios from "axios";
import toast from "react-hot-toast";

// 839572

const Lobby = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/contact-us/join-appointment`,
        {
          name,
          email,
        }
      );
      if (response.data.success) {
        socket.emit("room:join", { email, room: "839572" });
        toast.success(`${response.data.message}`);
      } else {
        toast.error(`${response.data.message}`);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinRoom = async () => {
    navigate(`/room/${839572}`);
  };

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="lobby-container">
      <h1 className="lobby-title">Join a Video Call</h1>
      <form className="lobby-form" onSubmit={handleSubmit}>
        <label className="lobby-label" htmlFor="email">
          Name:
        </label>
        <input
          className="lobby-input"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className="lobby-label" htmlFor="email">
          Email:
        </label>
        <input
          className="lobby-input"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="lobby-button">Join Room</button>
      </form>
    </div>
  );
};

export default Lobby;
