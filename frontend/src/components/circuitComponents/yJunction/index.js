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

const YJunction = ({ circuitComponent }) => {
  const inputPort1 = store.getState().port.instances.find((port) => port.id === circuitComponent.inputs[0]);
  const inputPort2 = store.getState().port.instances.find((port) => port.id === circuitComponent.inputs[1]);
  const outputPort = store.getState().port.instances.find((port) => port.id === circuitComponent.outputs[0]);

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
        key={inputPort1.id}
        id={inputPort1.id}
        image={inputPort1.image}
        x={inputPort1.x}
        y={inputPort1.y}
        interactive={inputPort1.interactive}
        buttonMode={inputPort1.buttonMode}
        pointerdown={portOnDragStart}
        pointerup={portOnDragEnd}
        pointerupoutside={portOnDragEnd}
        pointermove={portOnDragMove}
      >
        <SpriteLabel
          kind={"port"}
          text={"In1"}
          style={{
            fontSize: 14,
            align: "center",
          }}
        />
      </Port>
      <Port
        key={inputPort2.id}
        id={inputPort2.id}
        image={inputPort2.image}
        x={inputPort2.x}
        y={inputPort2.y}
        interactive={inputPort2.interactive}
        buttonMode={inputPort2.buttonMode}
        pointerdown={portOnDragStart}
        pointerup={portOnDragEnd}
        pointerupoutside={portOnDragEnd}
        pointermove={portOnDragMove}
      >
        <SpriteLabel
          kind={"port"}
          text={"In2"}
          style={{
            fontSize: 14,
            align: "center",
          }}
        />
      </Port>
      <Port
        key={outputPort.id}
        id={outputPort.id}
        image={outputPort.image}
        x={outputPort.x}
        y={outputPort.y}
        interactive={outputPort.interactive}
        buttonMode={outputPort.buttonMode}
        pointerdown={portOnDragStart}
        pointerup={portOnDragEnd}
        pointerupoutside={portOnDragEnd}
        pointermove={portOnDragMove}
      >
        <SpriteLabel
          kind={"port"}
          text={"O"}
          style={{
            fontSize: 14,
            align: "center",
          }}
        />
      </Port>
    </CircuitComponent>
  );
};

export default YJunction;
