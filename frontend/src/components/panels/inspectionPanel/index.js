import React from "react";
import SelectedComponent from "../../selectedComponent";
import "./styles.css";

const InspectionPanel = ({ simulate }) => {
  return (
    <div className="inspectionMenu">
      <span className="inspectionMenuTitle">Inspection</span>
      <SelectedComponent />
      <button className="simulateButton" onClick={simulate}>
        Simulate
      </button>
    </div>
  );
};

export default InspectionPanel;
