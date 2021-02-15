import React from "react";
import {
  onDragStart as circuitComponentOnDragStart,
  onDragMove as circuitComponentOnDragMove,
  onDragEnd as circuitComponentOnDragEnd,
  CircuitComponent,
} from "../../models/CircuitComponent";
import { onDragStart as portOnDragStart, onDragMove as portOnDragMove, onDragEnd as portOnDragEnd, Port } from "../../models/Port";
import "./styles.css";
import { store } from "../../store";
import { SpriteLabel } from "../../models/SpriteLabel";

const OutputReader = ({ circuitComponent }) => {
  const inputPort = store.getState().port.instances.find((port) => port.id === circuitComponent.inputs[0]);

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
      <SpriteLabel
        kind={circuitComponent.kind.kind}
        text={inputPort.power.toFixed(2)}
        style={{
          fontSize: 14,
          align: "center",
        }}
      />
      <SpriteLabel
        kind={circuitComponent.kind.kind}
        text={circuitComponent.label}
        style={{
          fontSize: 14,
          align: "top-right",
        }}
      />
    </CircuitComponent>
  );
};

export default OutputReader;
