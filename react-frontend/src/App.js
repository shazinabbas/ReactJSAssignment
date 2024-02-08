import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [data, setdata] = useState({
    MessageCategory: "",
    ID: 0,
    MessageType: "",
    Text1: "",
    Text2: "",
  });

  const [messageTypeColor, setMessageTypeColor] = useState("");
  
  const [buttonState, setButtonState] = useState({
    color: "yellow",
    text: "U",
  });

  useEffect(() => {
    // Flask server
    const fetchData = async () => {
      const response = await fetch("/data");
      const newData = await response.json();
      
      setdata({
        MessageCategory: newData.MessageCategory,
        ID: newData.ID,
        MessageType: newData.MessageType,
        Text1: newData.Text1,
        Text2: newData.Text2,
      });

      setMessageTypeColor(getMessageTypeColor(newData.MessageType));
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getMessageTypeColor = (messageType) => {
    switch (messageType) {
      case "A":
        return "yellow"; 
      case "B":
        return "#ED19B2"; 
      case "C":
        return "red"; 
      case "D":
        return "orange"; 
      default:
        return "yellow"; 
    }
  };

  const sendEventToServer = (eventText) => {
    fetch("/send-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventText }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send event to server");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleButtonClick = () => {
    setButtonState((prevState) => ({
      color: prevState.color === "yellow" ? "green" : "yellow",
      text: prevState.text === "U" ? "A" : "U",
    }));

    if (buttonState.text === "U") {
      sendEventToServer("A");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          src="/logo192.png"
          alt="Logo"
          style={{
            width: '50px',
            height: '50px',
            marginBottom: '20px',
          }}
        />

        <div className="frame">
          <div className="div">
            <div className="rectangle" style={{ backgroundColor: data.MessageCategory === "1" ? "yellow" : "orange" }}>
              <p>{data.ID}</p>
            </div>
            <div className="square" style={{ backgroundColor: messageTypeColor }}>
              <p>{data.MessageType}</p>
            </div>
            <button style={{ backgroundColor: buttonState.color, height: '40px', width: '60px', padding: '10px', borderRadius: '8px', border: 'none' }} onClick={handleButtonClick}>
              {buttonState.text}
            </button>
          </div>
          <div className="text" style={{ backgroundColor: data.MessageCategory === "1" ? "yellow" : "orange" }}>
            <p>{data.Text1}</p>
          </div>
          <div className="text" style={{ backgroundColor: data.MessageCategory === "1" ? "yellow" : "orange" }}>
            <p>{data.Text2}</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
