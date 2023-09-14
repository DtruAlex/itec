import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { sendMsgToOpenAI } from './openai';
import { useEffect, useRef, useState } from 'react';

function App() {
  const msgEnd = useRef(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
    text: "Hi. I am Replica. A clone of ChatGPT. How can I assist you today?",
    isBot: true,
    }]);
  
    const typeText = (element, text) => {
      let index = 0;
  
      let interval = setInterval(() => {
        if (index < text.length) {
          element.innerHTML += text.charAt(index);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 20);
    };


    useEffect(() => {
      msgEnd.current.scrollIntoView();
    
      // Find the most recent element with the "typing-animation" class and apply the typing effect
      const elements = document.querySelectorAll('.typing-animation');
      const latestElement = elements[elements.length - 1];
    
      if (latestElement) {
        const text = latestElement.textContent;
        latestElement.textContent = ''; // Clear the text content
        typeText(latestElement, text); // Apply typing animation
      }
    }, [messages]);

    const handleSend = async () => {
      const text = input;
      setInput('');
    
      // Display the user's message
      setMessages((prevMessages) => [
        ...prevMessages,
        { text, isBot: false },
      ]);

      // Get the bot's response
      const res = await sendMsgToOpenAI(text);
    
      // Simulate typing animation for the bot
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: res, isBot: true, typingAnimation: true },
      ]);
    
      // Simulate a pause in typing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      
    };
    
    
  const handleEnter = async (e)=> {
    if(e.key === 'Enter') await handleSend();
  }

  const handleQuery = async (e) => {
    const text = e.target.value;
    setInput('');
    setMessages([
      ...messages,
      {text, isBot:false}
    ])
    const res = await sendMsgToOpenAI(input);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true }
    ]);
  }

  return (
    <div className="App">

      <div className="sideBar">

        <div className="upperSide">
          <div className="upperSideTop"><img src={gptLogo} alt="Logo" className="logo" /><span className="brand">Replica</span></div>
          <button className="midBtn" onClick={()=>{window.location.reload()}}><img src={addBtn} alt="" className="addBtn" />New Chat</button>
          <div className="upperSideBottom">
            <button className="query" onClick={handleQuery} value={"What is Programming?"}><img src={msgIcon} alt="Query" />What is Programming?</button>
            <button className="query" onClick={handleQuery}  value={"How to use API?"}><img src={msgIcon} alt="Query" />How to use an API?</button>
          </div>

        </div>

        <div className="lowerSide">
          <div className="listItems"><img src={home} alt="Home" className="listItemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="Saved" className="listItemsImg" />Save</div>
          <div className="listItems"><img src={rocket} alt="Projects" className="listItemsImg" />Upgrade to Pro</div>
        </div>

      </div>

      <div className="main">
        <div className="chats">
          
    
        {messages.map((message, i) => (
          <div
            key={i}
            className={message.isBot ? "chat bot" : "chat"}
          >
            <img
              className="chatImg"
              src={message.isBot ? gptImgLogo : userIcon}
              alt=""
            />
            <p className="txt typing-animation">
              {message.text}
            </p>
          </div>
        ))}

          <div ref={msgEnd}/>

        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" placeholder="Send a message" value={input} onKeyDown={handleEnter} onChange={(e) => {setInput(e.target.value)}}/> <button className="send" onClick={handleSend}><img src={sendBtn} alt="Send" /></button>
          </div>
          <p>Trajector Medical</p>
        </div>
      </div>

    </div>
  );
}

export default App;
