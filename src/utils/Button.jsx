import React from "react";
import styled from "styled-components";

const KeyboardButton = ({ onClick, children, className, disabled, ...props }) => {
  return (
    <StyledWrapper>
      <button
        onClick={onClick}
        className={`game-ui-button ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
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
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.7), 0 0 20px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.3);
    transition: all 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
    display: inline-block;
    margin: 20px;
    outline: none;
  }

  .game-ui-button:focus {
    outline: 2px solid #007BFF; /* Ensure focus styles are visible */
  }

  .header-button:focus,
  .play-button:focus {
    outline: none; /* Remove focus styles for header and play buttons */
  }

  .game-ui-button::before {
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

  .game-ui-button:hover::before {
    display: none;
  }

  .game-ui-button:hover {
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.9), 0 0 25px rgba(0, 240, 255, 0.7), 0 0 35px rgba(0, 240, 255, 0.5);
    animation: none; /* Stop animation on hover */
  }

  .game-ui-button:active::after {
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

  .game-ui-button:active::after {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }

  .keyboard-button {
    background: linear-gradient(45deg, #00f0ff, #00bfff); /* Same background as other buttons */
    color: #ffffff; /* Light button text */
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.7), 0 0 20px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.3); /* Same box shadow */
    padding: 10px 20px; /* Adjust padding for keyboard buttons */
    margin: 4px; /* Adjust margin for keyboard buttons */
    transition: all 0.3s ease, box-shadow 0.3s ease; /* Same transition */
  }

  .keyboard-button:hover {
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.9), 0 0 25px rgba(0, 240, 255, 0.7), 0 0 35px rgba(0, 240, 255, 0.5);
  }

  .correct-guess,
  .incorrect-guess {
    box-shadow: none; /* Remove box shadow for clicked buttons */
    animation: none; /* Remove animation for clicked buttons */
  }

  .help-button {
    background: #6b46c1; /* Purple background */
  }

  .hint-button {
    background: #38a169; /* Green background */
  }

  .reset-button {
    background: #e53e3e; /* Red background */
  }

  .correct-guess {
    background: #38a169; /* Green background for correct guesses */
  }

  .incorrect-guess {
    background: #e53e3e; /* Red background for incorrect guesses */
  }
`;

export default KeyboardButton;