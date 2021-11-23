import React from "react";
import DropdownItem from "../dropdownItem";
import "./styles.css";

const DropdownItems = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <DropdownItem item={item} key={index} />
      ))}
    </div>
  );
};

export default DropdownItems;
