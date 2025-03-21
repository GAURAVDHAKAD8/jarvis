import React, { useContext } from "react";
import { motion } from "framer-motion";
import "./Main.css";
import { assets } from "../../assets/assets";
import { context } from "../../context/context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loadingTogetherAI,
    loadingGemini,
    resultData,
    setInput,
    togetherAiData,
    input,
  } = useContext(context);

  return (
    <div className="main">
      <div className="nav">
        <div className="logo">
          <img className="jarvislogo" src="/jarvislogo.png" alt="" />
          <h1>Jarvis</h1>
        </div>
        <img src="user.png" alt="" />
      </div>

      {!recentPrompt ? (
        <div className="intro">
          <div className="display">
            <div className="displayHeading">
              <motion.h2
                variants={{
                  hidden: { y: -100, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <img src="/jarvislogo.png" alt="" className="jarvislogoIntro" />
                Welcome To Jarvis
              </motion.h2>
            </div>
            <div className="paragraphs">
              <p>Get insights from multiple AI models in one place.</p>
              <p>Type your query below and see how different AIs respond! 🚀</p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="main-container">
        {showResult && (
          <div className="result">
            <div className="result-title">
              <img src="user.png" alt="" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-container">
              <div className="result-data">
                <img
                  src={assets.gemini_icon}
                  alt="Gemini"
                />
                {loadingGemini ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <div>
                    <div
                      className="Ai"
                      
                      dangerouslySetInnerHTML={{ __html: resultData }}
                    ></div>
                    {resultData && (
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(resultData)
                        }
                        className="copy"
                      >
                        Copy
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="result-data">
                <img
                  src="/meta.png"
                  alt="ChatGPT"
                 
                />
                {loadingTogetherAI ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <div>
                    <div
                      className="Ai"
                      dangerouslySetInnerHTML={{ __html: togetherAiData }}
                    ></div>
                    {togetherAiData && (
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(togetherAiData)
                        }
                        className="copy"
                      >
                        Copy
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) {
                  onSent();
                }
              }}
            />
            <div>
            
              {input ? (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  alt="Send"
                  tabIndex={0}
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Jarvis may display inaccurate info, including about people, so
            double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
