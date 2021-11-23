import React, { useEffect, useState, useRef } from "react";
import MeasuredOutputs from "../../measuredOutputs";
import { connect } from "react-redux";
import "./styles.css";

const INITIAL_ANALYTICS_HEIGHT = (window.innerHeight * 3) / 10;

const AnalyticsPanel = ({
  analyticsHeight,
  simulations,
  currentCircuitID,
  handleChangeAnalyticsHeight,
}) => {
  const [currentSimulation, setCurrentSimulation] = useState(undefined);
  // const [height, setHeight] = useState(INITIAL_ANALYTICS_HEIGHT);
  // const [initialY, setInitialY] = useState(0);

  const titleRef = useRef();

  useEffect(() => {
    setCurrentSimulation(
      simulations.find(
        (simulation) => simulation.circuitID === currentCircuitID
      )
    );
  }, [simulations, currentCircuitID]);

  useEffect(() => {
    if (currentSimulation?.measuredValues?.length) {
      handleChangeAnalyticsHeight(INITIAL_ANALYTICS_HEIGHT);
    } else {
      handleChangeAnalyticsHeight(0);
    }

    return () => handleChangeAnalyticsHeight(0);
  }, [currentSimulation, handleChangeAnalyticsHeight]);

  // useEffect(() => {
  //   const onMouseMove = (event) => {
  //     setHeight(height + (initialY - event.pageY));
  //     console.log(event.pageY);
  //     console.log(initialY);
  //   };

  //   const onMouseUp = () => {
  //     document.removeEventListener("mousemove", onMouseMove);
  //     setInitialY(0);
  //   };

  //   if (initialY) {
  //     document.addEventListener("mousemove", onMouseMove);
  //   } else {
  //     document.removeEventListener("mousemove", onMouseMove);
  //   }

  //   document.addEventListener("mouseup", onMouseUp);

  //   return () => document.removeEventListener("mouseup", onMouseUp);
  // }, [initialY, height]);

  // const handleTitleMouseDown = () => {
  //   setInitialY(titleRef.current.getBoundingClientRect().y);
  // };

  return (
    currentSimulation?.measuredValues?.length > 0 && (
      <div className="analyticsMenu" style={{ height: analyticsHeight }}>
        <div className="analyticsMenuTitle">
          <span ref={titleRef}>Analytics</span>
        </div>
        <MeasuredOutputs currentSimulation={currentSimulation} />
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  currentCircuitID: state.circuit.current,
  simulations: state.simulation.instances,
});

export default connect(mapStateToProps, null)(AnalyticsPanel);
