import React, { useEffect, useRef } from "react";
import DropdownItems from "../dropdownItems";
import "./styles.css";

const DropdownMenu = ({ showDropdown, setShowDropdown, items, left, top }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && ref.current && !ref.current.contains(event.target)) {
        //alert("You clicked outside of me!");
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, showDropdown, setShowDropdown]);

  return (
    <div>
      {showDropdown ? (
        <div ref={ref} className="dropdownMenu" style={{ left: left, top: top ? top : "29px" }}>
          <DropdownItems items={items} />
        </div>
      ) : null}
    </div>
  );
};

export default DropdownMenu;
