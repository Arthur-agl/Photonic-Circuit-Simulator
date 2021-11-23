import React from "react";
import "./styles.css";
import MainMenuButton from "../mainMenuButton";

const MainMenu = ({ buttons, onClick, onMouseEnter }) => {
  return (
    <div className="mainMenu">
      {buttons.map((button, index) => (
        <MainMenuButton key={index} name={button.name} onClick={onClick} onMouseEnter={() => onMouseEnter(index)} />
      ))}
    </div>
  );
};

export default MainMenu;
