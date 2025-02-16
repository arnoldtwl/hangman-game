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
    border-radius: 8px;
    padding: 8px 16px;
    color: #ffffff;
    font-size: 14px;
    font-family: "Orbitron", sans-serif;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    display: inline-block;
    margin: 8px;
    outline: none;

    @media (min-width: 768px) {
      padding: 12px 24px;
      font-size: 16px;
      margin: 12px;
      border-radius: 10px;
    }
  }

  .base-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .base-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .base-button:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: none;
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