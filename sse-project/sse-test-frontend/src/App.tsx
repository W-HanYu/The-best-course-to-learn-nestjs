import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    //const eventSource = new EventSource("http://localhost:3000/stream");
    //const eventSource = new EventSource("http://localhost:3000/stream2");
    const eventSource = new EventSource("http://localhost:3000/stream3");

    eventSource.onmessage = ({ data }) => {
      console.log("New message", JSON.parse(data));
    };
  }, []);
  return <div className="App">hello SSE</div>;
}

export default App;
