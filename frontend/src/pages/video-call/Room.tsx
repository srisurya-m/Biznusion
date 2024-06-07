import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider";
import peer from "./service/peer";
import { FaPhone } from "react-icons/fa";
import { AiOutlineClose, AiOutlineVideoCamera } from "react-icons/ai";
import {
  CallAcceptedPayload,
  IncomingCallPayload,
  NegoNeededFinalPayload,
  NegoNeededIncomingCallPayload,
  UserJoinedPayload,
} from "../../types/types";

const Room = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState("");
  const [myStream, setMyStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState<MediaStream>();
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [callInProgress, setCallInProgress] = useState(false); // New state
  const navigate = useNavigate();

  const handleUserJoined = ({ email, id }: UserJoinedPayload) => {
    console.log(`email ${email} joined the room`);
    setRemoteSocketId(id);
  };

  const handleCallUser = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
    // setCallInProgress(true); // Update call state
  };

  const handleIncomingCall = async ({ from, offer }: IncomingCallPayload) => {
    console.log(`Incoming call`, from, offer);
    setRemoteSocketId(from);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
    const ans = await peer.getAnswer(offer);
    socket.emit("call:accepted", { to: from, ans });
    // setCallInProgress(true); // Update call state
  };

  const sendStreams = () => {
    if (peer.peer?.signalingState !== "closed") {
      for (const track of myStream!.getTracks()) {
        peer.peer?.addTrack(track, myStream!);
      }
    } else {
      console.error("Peer connection is closed. Cannot send streams.");
    }
  };

  const handleCallAccepted = async ({ ans }: CallAcceptedPayload) => {
    try {
      await peer.setRemoteDescription(ans);
      console.log("Call Accepted");
      sendStreams();
    } catch (error) {
      console.error("Error setting local description for answer:", error);
    }
  };

  const handleNegoNeededIncoming = async ({
    from,
    offer,
  }: NegoNeededIncomingCallPayload) => {
    const ans = await peer.getAnswer(offer);
    socket.emit("peer:nego:done", { to: from, ans });
    // setCallInProgress(true);
  };

  const handleNegoNeededFinal = async ({ ans }: NegoNeededFinalPayload) => {
    await peer.setRemoteDescription(ans);
    setCallInProgress(true);
  };

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeededIncoming);
    socket.on("peer:nego:final", handleNegoNeededFinal);
    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeededIncoming);
      socket.off("peer:nego:final", handleNegoNeededFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleNegoNeededIncoming,
    handleNegoNeededFinal,
  ]);

  useEffect(() => {
    peer.peer?.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  const handleNegoNeeded = async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  };

  useEffect(() => {
    peer.peer?.addEventListener("negotiationneeded", handleNegoNeeded);

    return () => {
      peer.peer?.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const endCall = () => {
    // Turn off video by stopping all video tracks
    myStream?.getVideoTracks().forEach((track) => track.stop());

    // Notify the remote peer that the call has ended
    socket.emit("call:ended", { to: remoteSocketId });

    // Close the connection
    peer.peer?.close();

    // Stop all tracks in myStream
    myStream?.getTracks().forEach((track) => track.stop());

    // Reset streams and peer connection
    setMyStream(undefined);
    setRemoteStream(undefined);
    setCallInProgress(false); // Reset call state

    navigate("/")

    // Refresh the page
    window.location.reload();
  };

  const toggleVideo = () => {
    setVideoEnabled((prev) => {
      const newState = !prev;
      myStream?.getVideoTracks().forEach((track) => {
        track.enabled = newState;
      });
      return newState;
    });
  };

  const toggleAudio = () => {
    setAudioEnabled((prev) => {
      const newState = !prev;
      myStream?.getAudioTracks().forEach((track) => {
        track.enabled = newState;
      });
      return newState;
    });
  };

  return (
    <div className="room-container">
      <h4>{remoteSocketId ? "You are connected" : "No one in the room"}</h4>
      <div className="video-container remote-video-container">
        {remoteStream && (
          <ReactPlayer playing width="100%" height="100%" url={remoteStream} />
        )}
        <div className="video-container my-video-container">
          {myStream && (
            <ReactPlayer playing muted width="100%" height="100%" url={myStream} />
          )}
        </div>
      </div>
      <div className="controls">
        {remoteSocketId && !callInProgress && (
          <button className="room-button call-button" onClick={handleCallUser}>
            <FaPhone /> Call
          </button>
        )}
        {myStream && !callInProgress && (
          <button className="room-button" onClick={sendStreams}>
            <AiOutlineVideoCamera /> Send Stream
          </button>
        )}
        {myStream && (
          <>
            <button className="room-button" onClick={toggleVideo}>
              {videoEnabled ? "Turn Video Off" : "Turn Video On"}
            </button>
            <button className="room-button" onClick={toggleAudio}>
              {audioEnabled ? "Mute Audio" : "Unmute Audio"}
            </button>
          </>
        )}
        {remoteSocketId && (
          <button className="room-button end-call-button" onClick={endCall}>
            <AiOutlineClose /> End Call
          </button>
        )}
      </div>
    </div>
  );
};

export default Room;
