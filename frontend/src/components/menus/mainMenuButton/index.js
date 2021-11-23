import React from "react";
import "./styles.css";

const MainMenuButton = ({ name, onClick, onMouseEnter }) => {
  return (
    <div className="collectionItem" onClick={onClick} onMouseEnter={onMouseEnter} id={name}>
      {name}
    </div>
  );
};

export default MainMenuButton;
