import React, { useEffect, useRef, useState } from "react";
import ACTIONS from "../Actions";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import { useLocation, useParams } from "react-router-dom";

const EditorPage = () => {
  const socketRef = useRef(null);
  const { roomId } = useParams();
  const location = useLocation();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });
    };

    init();
  }, []);

  const [clients, setClients] = useState([
    { socketId: 1, username: "Archish jain" },
    { socketId: 2, username: "Joe Schmoe " },
  ]);

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoImage" src="/code-sync.png" alt="logo" />
          </div>
          <h3>Connected</h3>

          <div className="clientsList">
            {clients.map((client) => {
              return (
                <Client
                  key={client.socketId}
                  username={client.username}
                ></Client>
              );
            })}
          </div>
        </div>

        <button className="btn copyBtn">Copy ROOM ID</button>
        <button className="btn leaveBtn">Leave</button>
      </div>

      <div className="editorWrap">
        <Editor></Editor>
      </div>
    </div>
  );
};

export default EditorPage;
