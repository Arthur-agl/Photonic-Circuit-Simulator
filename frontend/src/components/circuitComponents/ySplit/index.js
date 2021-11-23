import React from "react";
import {
  onDragStart as circuitComponentOnDragStart,
  onDragMove as circuitComponentOnDragMove,
  onDragEnd as circuitComponentOnDragEnd,
  CircuitComponent,
} from "../../../models/CircuitComponent";
import { onDragStart as portOnDragStart, onDragMove as portOnDragMove, onDragEnd as portOnDragEnd, Port } from "../../../models/Port";
import "./styles.css";
import { store } from "../../../store";
import { SpriteLabel } from "../../../models/SpriteLabel";

const Switch = ({ circuitComponent }) => {
  const inputPort = store.getState().port.instances.find((port) => port.id === circuitComponent.inputs[0]);
  const outputPort1 = store.getState().port.instances.find((port) => port.id === circuitComponent.outputs[0]);
  const outputPort2 = store.getState().port.instances.find((port) => port.id === circuitComponent.outputs[1]);

  return (
    <CircuitComponent
      key={circuitComponent.id}
      id={circuitComponent.id}
      image={circuitComponent.kind.image}
      x={circuitComponent.x}
      y={circuitComponent.y}
      interactive={circuitComponent.interactive}
      buttonMode={circuitComponent.buttonMode}
      pointerdown={circuitComponentOnDragStart}
      pointerup={circuitComponentOnDragEnd}
      pointerupoutside={circuitComponentOnDragEnd}
      pointermove={circuitComponentOnDragMove}
    >
      <Port
        key={inputPort.id}
        id={inputPort.id}
        image={inputPort.image}
        x={inputPort.x}
        y={inputPort.y}
        interactive={inputPort.interactive}
        buttonMode={inputPort.buttonMode}
        pointerdown={portOnDragStart}
        pointerup={portOnDragEnd}
        pointerupoutside={portOnDragEnd}
        pointermove={portOnDragMove}
      >
        <SpriteLabel
          kind={"port"}
          text={"In"}
          style={{
            fontSize: 14,
            align: "center",
          }}
        />
      </Port>
      <Port
        key={outputPort1.id}
        id={outputPort1.id}
        image={outputPort1.image}
        x={outputPort1.x}
        y={outputPort1.y}
        interactive={outputPort1.interactive}
        buttonMode={outputPort1.buttonMode}
        pointerdown={portOnDragStart}
        pointerup={portOnDragEnd}
        pointerupoutside={portOnDragEnd}
        pointermove={portOnDragMove}
      >
        <SpriteLabel
          kind={"port"}
          text={"O1"}
          style={{
            fontSize: 14,
            align: "center",
          }}
        />
      </Port>
      <Port
        key={outputPort2.id}
        id={outputPort2.id}
        image={outputPort2.image}
        x={outputPort2.x}
        y={outputPort2.y}
        interactive={outputPort2.interactive}
        buttonMode={outputPort2.buttonMode}
        pointerdown={portOnDragStart}
        pointerup={portOnDragEnd}
        pointerupoutside={portOnDragEnd}
        pointermove={portOnDragMove}
      >
        <SpriteLabel
          kind={"port"}
          text={"O2"}
          style={{
            fontSize: 14,
            align: "center",
          }}
        />
      </Port>
    </CircuitComponent>
  );
};

export default Switch;
