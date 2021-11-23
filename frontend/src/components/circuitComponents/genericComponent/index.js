import React from "react";
import "./styles.css";
import Switch from "../switch";
import OutputReader from "../outputReader";
import PowerSource from "../powerSource";
import YJunction from "../yJunction";
import YSplit from "../ySplit";

const GenericComponent = ({ circuitComponent }) => {
  const selectComponent = () => {
    switch (circuitComponent.kind.kind) {
      case "swn":
        return <Switch circuitComponent={circuitComponent} />;
      case "swp":
        return <Switch circuitComponent={circuitComponent} />;
      case "power_source":
        return <PowerSource circuitComponent={circuitComponent} />;
      case "output_reader":
        return <OutputReader circuitComponent={circuitComponent} />;
      case "y_junction":
        return <YJunction circuitComponent={circuitComponent} />;
      case "y_split":
        return <YSplit circuitComponent={circuitComponent} />;
      default:
        return null;
    }
  };

  return circuitComponent.confirmedCreation ? selectComponent() : null;
};

export default GenericComponent;
