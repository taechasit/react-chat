import Axios from "axios";
import React, { useState, useEffect } from "react";

import "./App.css";
import Chatmsg from "./Chatmsg";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputData, setInputData] = useState("");
  const [chatdata, setChatdata] = useState([]);

  const onChatcircleClick = (e) => {
    setIsChatOpen(!isChatOpen);
  };

  const onsubmits = (e) => {
    e.preventDefault();

    let chatDataarr = [...chatdata];

    chatDataarr.push({ msg: inputData, type: "self" });
    chatDataarr.push({ msg: inputData, type: "user" });

    setChatdata(chatDataarr);

    Axios.put(
      "https://react-chat-6698d.firebaseio.com/chatDatas/-MIy3UZkIQ31XBnHMwLs.json",
      chatDataarr
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(chatdata);
  };

  useEffect(() => {
    Axios.get("https://react-chat-6698d.firebaseio.com/chatDatas/-MIy3UZkIQ31XBnHMwLs.json")
      .then((res) => {
        console.log(res.data);
        setChatdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let chatdatas = null;

  if (chatdata) {
    chatdatas = chatdata.map((item, index) => {
      return (
        <Chatmsg index={index} key={index} type={item.type} msg={item.msg} />
      );
    });
  }

  return (
    <React.Fragment>
      <div id="center-text">
        <h2>ChatBox UI</h2>
        <p>Message send and scroll to bottom enabled </p>
      </div>

      <div id="body">
        <div
          id="chat-circle"
          style={{ display: isChatOpen ? "none" : "block" }}
          className="btn btn-raised"
          onClick={onChatcircleClick}
        >
          <div id="chat-overlay"></div>
          <i className="material-icons">
            <svg viewBox="0 0 25 25" fill="white" width="25px" height="25px">
              <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
              <path d="M7 7.07L8.43 8.5c.91-.91 2.18-1.48 3.57-1.48s2.66.57 3.57 1.48L17 7.07C15.72 5.79 13.95 5 12 5s-3.72.79-5 2.07zM12 1C8.98 1 6.24 2.23 4.25 4.21l1.41 1.41C7.28 4 9.53 3 12 3s4.72 1 6.34 2.62l1.41-1.41C17.76 2.23 15.02 1 12 1zm2.86 9.01L9.14 10C8.51 10 8 10.51 8 11.14v9.71c0 .63.51 1.14 1.14 1.14h5.71c.63 0 1.14-.51 1.14-1.14v-9.71c.01-.63-.5-1.13-1.13-1.13zM15 20H9v-8h6v8z" />
            </svg>
          </i>
        </div>

        <div
          className="chat-box"
          style={{ display: isChatOpen ? "block" : "none" }}
        >
          <div className="chat-box-header">
            ChatBot
            <span className="chat-box-toggle" onClick={onChatcircleClick}>
              <i className="material-icons">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30"
                  viewBox="0 0 24 24"
                  width="30"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </i>
            </span>
          </div>

          <div className="chat-box-body">
            <div className="chat-box-overlay"></div>
            <div className="chat-logs">{chatdatas}</div>
          </div>

          <div className="chat-input">
            <form
              onSubmit={(e) => {
                onsubmits(e);
              }}
            >
              <input
                type="text"
                id="chat-input"
                placeholder="Send a message..."
                value={inputData}
                onChange={(e) => {
                  setInputData(e.target.value);
                }}
              />
              <button type="submit" className="chat-submit" id="chat-submit">
                <i className="material-icons">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
