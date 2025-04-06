import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SleepForm from './SleepForm';
import './App.css';
import addBtn from './assets/add-30.png';
import sleep from './assets/sleep.svg';
import dna from './assets/dna.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import logo from './assets/logo.svg';
import { sendMsgToOpenAI } from './openai';
import ImageConverter from "./ImageConverter";
import StrokePredictor from "./StrokePredictor";
import HeartAttackPredictor from "./HeartAttackPredictor";
import PulmonaryProblems from "./PulmonaryProblems";

function App() {
  const msgEnd = useRef("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{
    text: "Hi. I'm H.A.D, your Health Assistent Diagnoser. How can I assist you today?",
    isBot: true,
  }]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isThinking, setIsThinking] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleThinking = () => {
    setIsThinking(!isThinking);
  };

  const mediaQuery = window.matchMedia('(max-width: 768px)');

  useEffect(() => {
    const handleMediaChange = (e) => {
      if (e.matches) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    mediaQuery.addListener(handleMediaChange);
    handleMediaChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaChange);
    };
  }, []);

  const typeText = (element, text) => {
    let index = 0;

    let interval = setInterval(() => {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 10);
  };

  useEffect(() => {
    const scrollChatToBottom = () => {
      msgEnd.current.scrollIntoView({ behavior: "smooth" });
    };
    const elements = document.querySelectorAll('.typing-animation');
    const latestElement = elements[elements.length - 1];

    if (latestElement) {
      const text = latestElement.textContent;
      latestElement.textContent = '';
      typeText(latestElement, text);
      setTimeout(scrollChatToBottom, text.length * 10);
    } else {
      scrollChatToBottom();
    }
  }, [messages]);

  const handleSend = async () => {
    const text = input;
    setInput('');

    setMessages((prevMessages) => [
      ...prevMessages,
      { text, isBot: false },
    ]);

    if (isThinking) {
      const res = await sendMsgToOpenAI(text);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: res, isBot: true, typingAnimation: true },
      ]);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Thinking is turned off.", isBot: true },
      ]);
    }

    const chatContainer = document.querySelector('.chats');

    const checkAnimationInterval = setInterval(() => {
      chatContainer.scrollTop = chatContainer.scrollHeight;

      const latestBotMessageIndex = messages.length - 1;
      if (latestBotMessageIndex >= 0) {
        const latestBotMessage = messages[latestBotMessageIndex];
        if (!latestBotMessage.typingAnimation) {
          clearInterval(checkAnimationInterval);
        }
      }
    }, 100);
  };

  const handleEnter = async (e) => {
    if (e.key === 'Enter') await handleSend();
  }

  return (
      <Router>
        <div className={`App ${showSidebar ? 'sidebar-open' : ''}`}>
          {mediaQuery.matches && (
              <button className="hamburger" onClick={toggleSidebar}>
                &#9776;
              </button>
          )}

          <div className={`sidebar-container ${showSidebar ? 'sidebar-open' : ''}`}>
            <div className="sideBar">
              <div className="upperSide">
                <div className="upperSideTop">
                  <img src={logo} style={{ width: "40px", }} alt="Logo" className="logo" />
                  <span className="brand">H.A.D.</span>
                </div>
              </div>

              <div className="lowerSide">
                <Link to="/" className='links'>
                  <div className="listItems">
                    <img src={sleep} alt="H.A.D Chat" className="listItemsImg" />
                    Chat with H.A.D
                  </div>
                </Link>
                <Link to="/sleep" className='links'>
                  <div className="listItems">
                    <img src={sleep} alt="SleepDiagnostics" className="listItemsImg" />
                    Sleep Problems Diagnoser
                  </div>
                </Link>
                <Link to="/cancer" className='links'>
                  <div className="listItems">
                    <img src={dna} alt="CancerDetector" className="listItemsImg" />
                    Cancer Detector
                  </div>
                </Link>
                <Link to="/stroke" className='links'>
                  <div className="listItems">
                    <img src={dna} alt="StrokePredictor" className="listItemsImg" />
                    Stroke Predictor
                  </div>
                </Link>
                <Link to="/heart" className='links'>
                  <div className="listItems">
                    <img src={dna} alt="HeartAttackPredictor" className="listItemsImg" />
                    Heart Attack Predictor
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className={`main ${showSidebar ? 'main-with-sidebar' : ''}`}>
            <Routes>
              <Route path="/" element={
                <div className="chatContainer">
                  <div className="chats">
                    {showSidebar && <div className="overlay" onClick={toggleSidebar}></div>}
                    {messages.map((message, i) => (
                        <div
                            key={i}
                            className={`chat ${message.isBot ? 'bot' : ''} ${message.isBot && i > 0 ? 'bot-response' : ''}`}
                        >
                          <img className="chatImg" src={message.isBot ? logo : userIcon} alt=""/>
                          {message.text && (
                              <p className="txt typing-animation" style={{ whiteSpace: 'pre-line' }}>
                                {message.text.trim()}
                              </p>
                          )}
                        </div>
                    ))}
                    <div ref={msgEnd} />
                  </div>
                  <div className="chatFooter">
                    <div className="inp">
                      <input
                          type="text"
                          placeholder="Send a message"
                          value={input}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSend();
                          }}
                          onChange={(e) => {
                            setInput(e.target.value)
                          }}
                      />
                      <button className="send" onClick={handleSend}>
                        <img src={sendBtn} alt="Send" />
                      </button>
                    </div>
                    <label className="switch">
                      <input type="checkbox" checked={isThinking} onChange={toggleThinking} />
                      <span className="slider round"></span>
                    </label>
                    <p>H.A.D - The advice given is not medical advice, please consult a doctor </p>
                  </div>
                </div>
              } />
              <Route path="/sleep" element={<div className="own-css"><SleepForm /></div>} />
              <Route path="/cancer" element={<div className="own-css"> <ImageConverter></ImageConverter></div>} />
              <Route path="/heart" element={<div className="own-css"> <HeartAttackPredictor></HeartAttackPredictor></div>} />
              <Route path="/stroke" element={<div className="own-css"> <StrokePredictor></StrokePredictor></div>} />
              <Route path="/pulmonary" element={<div className="own-css"> <PulmonaryProblems></PulmonaryProblems></div>} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;