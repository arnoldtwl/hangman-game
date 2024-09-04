import React from "react";
import styled from "styled-components";

const Button = () => {
  return (
    <StyledWrapper>
      <button className="game-ui-button">Start Game</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .game-ui-button {
  background: linear-gradient(45deg, #00f0ff, #00bfff);
  border: none;
  border-radius: 12px;
  padding: 15px 30px;
  color: #ffffff;
  font-size: 20px;
  font-family: "Orbitron", sans-serif;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow:
    0 0 10px rgba(0, 240, 255, 0.7),
    0 0 20px rgba(0, 240, 255, 0.5),
    0 0 30px rgba(0, 240, 255, 0.3);
  transition:
    all 0.3s ease,
    box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  display: inline-block;
  margin: 20px;
  outline: none;
}

.game-ui-button {
  margin-right: 8px;
}

.game-ui-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.7),
    transparent
  );
  transition: all 0.5s ease;
  animation: slide 2s infinite linear;
  pointer-events: none;
}

@keyframes slide {
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: -100%;
  }
}

.game-ui-button:hover::before {
  display: none;
}

.game-ui-button:hover {
  box-shadow:
    0 0 15px rgba(0, 240, 255, 0.9),
    0 0 25px rgba(0, 240, 255, 0.7),
    0 0 35px rgba(0, 240, 255, 0.5);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    box-shadow:
      0 0 15px rgba(0, 240, 255, 0.9),
      0 0 25px rgba(0, 240, 255, 0.7),
      0 0 35px rgba(0, 240, 255, 0.5);
  }
  50% {
    box-shadow:
      0 0 20px rgba(0, 240, 255, 1),
      0 0 30px rgba(0, 240, 255, 0.8),
      0 0 40px rgba(0, 240, 255, 0.6);
  }
  100% {
    box-shadow:
      0 0 15px rgba(0, 240, 255, 0.9),
      0 0 25px rgba(0, 240, 255, 0.7),
      0 0 35px rgba(0, 240, 255, 0.5);
  }
}

.game-ui-button::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  transform: scale(0);
  transition:
    transform 0.4s ease-out,
    opacity 0.4s ease-out;
  opacity: 0;
  pointer-events: none;
}

.game-ui-button:active::after {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}

`;

export default Button;
