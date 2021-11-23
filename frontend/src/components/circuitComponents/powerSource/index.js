import React, { useRef } from "react";
import {
  onDragStart as circuitComponentOnDragStart,
  onDragMove as circuitComponentOnDragMove,
  onDragEnd as circuitComponentOnDragEnd,
  CircuitComponent,
} from "../../../models/CircuitComponent";
import {
  onDragStart as portOnDragStart,
  onDragMove as portOnDragMove,
  onDragEnd as portOnDragEnd,
  Port,
} from "../../../models/Port";
import { SpriteLabel } from "../../../models/SpriteLabel";
import "./styles.css";
import { store } from "../../../store";
import ComponentLabel from "../../componentLabel";

const PowerSource = ({ circuitComponent }) => {
  const outputPort = store
    .getState()
    .port.instances.find((port) => port.id === circuitComponent.outputs[0]);

  const componentRef = useRef();

  return (
    <>
      <CircuitComponent
        ref={componentRef}
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
      <ComponentLabel
        circuitComponent={circuitComponent}
        componentRef={componentRef}
      />
    </>
  );
};

export default PowerSource;
