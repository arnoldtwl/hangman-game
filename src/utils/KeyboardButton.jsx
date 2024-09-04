import React from "react";
import styled from "styled-components";

const Button = () => {
  return (
    <StyledWrapper>
      <div className="hangman-container">
        <div className="keyboard">
          <button className="key">A</button>
          <button className="key">B</button>
          <button className="key">C</button>
          <button className="key">D</button>
          <button className="key">E</button>
          <button className="key">F</button>
          <button className="key">G</button>
          <button className="key">H</button>
          <button className="key">I</button>
          <button className="key">J</button>
          <button className="key">K</button>
          <button className="key">L</button>
          <button className="key">M</button>
          <button className="key">N</button>
          <button className="key">O</button>
          <button className="key">P</button>
          <button className="key">Q</button>
          <button className="key">R</button>
          <button className="key">S</button>
          <button className="key">T</button>
          <button className="key">U</button>
          <button className="key">V</button>
          <button className="key">W</button>
          <button className="key">X</button>
          <button className="key">Y</button>
          <button className="key">Z</button>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .hangman-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0; /* Adding padding to center content vertically */
  background-color: #f0f0f0;
  margin: 0;
  font-family: Arial, sans-serif;
  min-height: 600px; /* Minimum height to provide space */
}

.keyboard {
  display: grid;
  grid-template-columns: repeat(6, 40px); /* 6 columns per row */
  gap: 10px; /* Space between buttons */
}

.key {
  width: 40px;
  height: 40px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.key:hover {
  background-color: #2980b9;
}

.key:active {
  background-color: #1c5e86;
  transform: scale(0.95);
}

`;

export default Button;
