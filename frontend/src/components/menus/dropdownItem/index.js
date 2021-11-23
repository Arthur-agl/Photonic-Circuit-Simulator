import React, { useEffect, useState } from "react";
import "./styles.css";
import { FaAngleRight } from "react-icons/fa";
import DropdownMenu from "../dropdownMenu";

const DropdownItem = ({ item }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [left, setLeft] = useState(null);
  const [top, setTop] = useState(null);
  const [items, setItems] = useState([]);
  const [prevent, setPrevent] = useState(false);

  let timerEnter = 0;
  let timerLeave = 0;
  let delayEnter = 200;
  let delayLeave = 1000;

  useEffect(() => {
    return () => {
      clearTimeout(timerEnter);
      clearTimeout(timerLeave);
    };
  });

  const expandIfComposite = async () => {
    if (item.composite) {
      const element = document.getElementById(item.name);
      const rect = element.getBoundingClientRect();

      setLeft(rect.right);
      setTop(rect.top - rect.height);

      const items = await item.setItems();
      setItems(items);

      setShowDropdown(true);
      setPrevent(true);
    }
  };

  const handleClick = () => {
    clearTimeout(timerEnter);
    setPrevent(true);

    item.onClick(item.id);
    expandIfComposite();
  };

  const handleMouseEnter = () => {
    clearTimeout(timerLeave);

    timerEnter = setTimeout(() => {
      if (!prevent) {
        expandIfComposite();
      }
    }, delayEnter);
  };

  const handleMouseLeave = () => {
    timerLeave = setTimeout(() => {
      setShowDropdown(false);
      setPrevent(false);
    }, delayLeave);
  };

  return (
    <div onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <li className="dropdownItem" id={item.name}>
        {item.name}
        {item.composite ? (
          <div style={{ display: "flex", alignItems: "center", marginLeft: "8px" }}>
            <FaAngleRight />
          </div>
        ) : null}
      </li>
      {showDropdown ? <DropdownMenu showDropdown={showDropdown} setShowDropdown={setShowDropdown} items={items} left={left} top={top} /> : null}
    </div>
  );
};

export default DropdownItem;
