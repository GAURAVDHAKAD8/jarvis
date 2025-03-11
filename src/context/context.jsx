import { createContext, useState } from "react";
import run from "../config/gemini";
import askTogetherAI from "../config/togetherAi.js";

export const context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loadingGemini, setLoadingGemini] = useState(false);
  const [loadingTogetherAI, setLoadingTogetherAI] = useState(false);
  const [resultData, setResultData] = useState("");
  const [togetherAiData, setTogetherAiData] = useState("");

  const delayPara = (index, nextWord, isTogetherAI = false) => {
    setTimeout(() => {
      if (isTogetherAI) {
        setTogetherAiData((prev) => prev + nextWord);
      } else {
        setResultData((prev) => prev + nextWord);
      }
    }, 75 * index);
  };
const newChat = () => {
  setLoadingGemini(false); // Reset Gemini loading state
  setLoadingTogetherAI(false); // Reset TogetherAI loading state
  setShowResult(false); // Hide the result section
  setResultData(""); // Clear Gemini response data
  setTogetherAiData(""); // Clear TogetherAI response data
  setRecentPrompt(""); // Clear the recent prompt
  setInput(""); // Clear the input field
};

const onSent = async (prompt) => {
  setResultData("");
  setTogetherAiData("");
  setLoadingGemini(true); // Start loading for Gemini
  setLoadingTogetherAI(true); // Start loading for TogetherAI
  setShowResult(true);

  const userPrompt = prompt !== undefined ? prompt : input;

  setRecentPrompt(userPrompt);
  if (prompt === undefined) {
    setPreviousPrompt((prev) => [...prev, input]);
  }

  setInput("");

  // Fetch Gemini response
  run(userPrompt).then((geminiResponse) => {
    let geminiResponseArray = geminiResponse.split("**");
    let newGeminiResponse = "";
    for (let i = 0; i < geminiResponseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newGeminiResponse += geminiResponseArray[i];
      } else {
        newGeminiResponse += "<b>" + geminiResponseArray[i] + "</b>";
      }
    }
    let formattedGeminiResponse = newGeminiResponse.split("*").join("</br>");
    let geminiWords = formattedGeminiResponse.split(" ");

    for (let i = 0; i < geminiWords.length; i++) {
      const nextWord = geminiWords[i];
      delayPara(i, nextWord + " ");
    }

    setLoadingGemini(false); // Stop loading for Gemini
  });

  // Fetch TogetherAI response
   askTogetherAI(userPrompt).then((togetherAIResponse) => {
     let togetherAIResponseArray = togetherAIResponse.split("**");
     let newTogetherAIResponse = "";
     for (let i = 0; i < togetherAIResponseArray.length; i++) {
       if (i === 0 || i % 2 !== 1) {
         newTogetherAIResponse += togetherAIResponseArray[i];
       } else {
         newTogetherAIResponse += "<b>" + togetherAIResponseArray[i] + "</b>";
       }
     }
     let formattedTogetherAIResponse = newTogetherAIResponse
       .split("*")
       .join("</br>");
     let togetherAIWords = formattedTogetherAIResponse.split(" ");

     for (let i = 0; i < togetherAIWords.length; i++) {
       const nextWord = togetherAIWords[i];
       delayPara(i, nextWord + " ", true);
     }

     setLoadingTogetherAI(false); // Stop loading for TogetherAI
   });
};

const contextValue = {
  previousPrompt,
  setPreviousPrompt,
  onSent,
  setRecentPrompt,
  recentPrompt,
  showResult,
  loading: loadingGemini || loadingTogetherAI, // Global loading state
  loadingGemini, // Separate loading state for Gemini
  loadingTogetherAI, // Separate loading state for TogetherAI
  resultData,
  togetherAiData,
  input,
  setInput,
  newChat,
};

  return (
    <context.Provider value={contextValue}>{props.children}</context.Provider>
  );
};

export default ContextProvider;
