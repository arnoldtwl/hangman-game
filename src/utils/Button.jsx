import React from "react";
import styled from "styled-components";

const KeyboardButton = ({ onClick, children, className, disabled, ...props }) => {
  return (
    <StyledWrapper>
      <button
        onClick={onClick}
        className={`base-button ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .base-button {
    border: none;
    border-radius: 12px;
    padding: 15px 30px;
    color: #ffffff;
    font-size: 20px;
    font-family: "Orbitron", sans-serif;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
    display: inline-block;
    margin: 20px;
    outline: none;
  }

  .base-button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7), transparent);
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

  .base-button:hover::before {
    display: none;
  }

  .base-button:active::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    transform: scale(0);
    transition: transform 0.4s ease-out, opacity 0.4s ease-out;
    opacity: 0;
    pointer-events: none;
  }

  .base-button:active::after {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }

  /* Game UI Button Styles */
  .game-ui-button {
    background: linear-gradient(45deg, #00f0ff, #00bfff);
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.7), 0 0 20px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.3);
  }

  .game-ui-button:hover {
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.9), 0 0 25px rgba(0, 240, 255, 0.7), 0 0 35px rgba(0, 240, 255, 0.5);
  }

  /* Header Button Styles */
  .header-button {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.1);
  }

  .header-button:hover {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.3), 0 0 35px rgba(255, 255, 255, 0.2);
  }

  /* Game Specific Button Styles */
  .keyboard-button {
    padding: 10px 20px;
    margin: 4px;
  }

  .help-button {
    background: linear-gradient(45deg, #6b46c1, #805ad5);
  }

  .hint-button {
    background: linear-gradient(45deg, #38a169, #48bb78);
  }

  .reset-button {
    background: linear-gradient(45deg, #e53e3e, #f56565);
  }

  .correct-guess {
    background: linear-gradient(45deg, #38a169, #48bb78);
    box-shadow: none;
    animation: none;
  }

  .incorrect-guess {
    background: linear-gradient(45deg, #e53e3e, #f56565);
    box-shadow: none;
    animation: none;
  }
`;

export default KeyboardButton;