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
  const controlPort = store.getState().port.instances.find((port) => port.id === circuitComponent.inputs[1]);
  const outputPort = store.getState().port.instances.find((port) => port.id === circuitComponent.outputs[0]);
  const drainPort = store.getState().port.instances.find((port) => port.id === circuitComponent.outputs[1]);

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
        key={controlPort.id}
        id={controlPort.id}
        image={controlPort.image}
        x={controlPort.x}
        y={controlPort.y}
        interactive={controlPort.interactive}
        buttonMode={controlPort.buttonMode}
        pointerdown={portOnDragStart}
        pointerup={portOnDragEnd}
        pointerupoutside={portOnDragEnd}
        pointermove={portOnDragMove}
      >
        <SpriteLabel
          kind={"port"}
          text={"C"}
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
      <Port
        key={drainPort.id}
        id={drainPort.id}
        image={drainPort.image}
        x={drainPort.x}
        y={drainPort.y}
        interactive={drainPort.interactive}
        buttonMode={drainPort.buttonMode}
        pointerdown={portOnDragStart}
        pointerup={portOnDragEnd}
        pointerupoutside={portOnDragEnd}
        pointermove={portOnDragMove}
      >
        <SpriteLabel
          kind={"port"}
          text={"D"}
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
