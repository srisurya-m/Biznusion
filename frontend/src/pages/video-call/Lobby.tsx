import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../context/SocketProvider';

const Lobby = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const [email, setEmail] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<string>('');

  const handleRoomSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRoom(e.target.value);
    setRoom(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("room:join", { email, room });
  };

  const handleJoinRoom = async (data : {email:string,room:string}) => {
    const {room } =data
    navigate(`/room/${room}`)
  };

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return ()=>{
        socket.off("room:join", handleJoinRoom)
    }
  }, [socket,handleJoinRoom]);

  return (
    <div className="lobby-container">
      <h1 className="lobby-title">Join a Video Call</h1>
      <form className="lobby-form" onSubmit={handleSubmit}>
        <label className="lobby-label" htmlFor="email">Email:</label>
        <input
          className="lobby-input"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="lobby-label" htmlFor="roomName">Room:</label>
        <select
          className="lobby-select" // Added class for styling select
          id="roomName"
          value={selectedRoom}
          onChange={handleRoomSelect}
          required
        >
          <option value="" disabled>Select a Room</option>
          <option value="48273">Business Analysis and Problems</option>
          <option value="69184">Consulting</option>
          <option value="35792">Big Data Analysis</option>
          <option value="84061">Digital Marketing</option>
          <option value="12345">Other Query</option>
        </select>
        <button className="lobby-button">Join Room</button>
      </form>
    </div>
  );
};

export default Lobby;
