import React, { useContext, useState } from "react";
import "./sidebar.css";
import { assets } from "../../assets/assets";
import { context } from "../../context/context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, previousPrompt, setRecentPrompt, newChat } = useContext(context);


 const loadPrompt = async (prompt) => {
   setRecentPrompt(prompt);
   setTimeout(() => {
     onSent(prompt);
   }, 50); // Small delay to ensure recentPrompt updates before calling onSent
 };


  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          onClick={() => setExtended((prev) => !prev)}
          src="/sidemenu.png"
          alt=""
        />
        <div onClick={()=>newChat()} className="newchat">
          <img src="/plus.png" alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {previousPrompt && previousPrompt.map((item, index) => {
              return (
                <div onClick={()=>loadPrompt(item)} key={index} className="recent-entry">
                  <img src="/chat.png" alt="" />
                  <p>{item.slice(0,18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
