import React from "react";

const Chatmsg = (props) => {
  return (
    <div id={"cm-msg-" + props.index} className={"chat-msg " + props.type}>
      <div className="cm-msg-text">{props.msg}</div>
    </div>
  );
};

export default Chatmsg;
