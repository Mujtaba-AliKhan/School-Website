import React from "react";
import Homepage from "./Homepage/homepage";
import "./App.css";
import Navbar from "./Navbar/navbar";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Homepage />
      </div>
    </div>
  );
};

export default App;
