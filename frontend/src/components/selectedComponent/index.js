import React, { useCallback, useEffect, useState } from "react";
import Container from "../container";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./styles.css";
import { getPortData } from "../../store";
import InspectionOutputs from "../inspectionOutputs";
import PowerSourceInspectionOutputs from "../powerSourceInspectionOutputs";
import {
  calculateOutputs,
  deleteSelected,
  setSelectedComponentLabel,
} from "../../store/ducks/circuitComponent";
import { FaTrashAlt } from "react-icons/fa";
import { applyDebounce, createDebounce } from "../../utils/debounce";
import useKeyboardShortcut from 'use-keyboard-shortcut';

const SelectedComponent = ({
  selectedComponent,
  calculateOutputs,
  deleteComponent,
  setSelectedComponentLabel,
}) => {
  const [label, setLabel] = useState(selectedComponent?.label || "");

  useEffect(() => {
    setLabel(selectedComponent?.label || "");
  }, [selectedComponent]);

  const saveLabelValue = useCallback(
    (value) => {
      setSelectedComponentLabel(value);
    },
    [setSelectedComponentLabel]
  );

  const handleLabelChange = (event) => {
    setLabel(event.target.value);
    applyDebounce([event.target.value]);
  };

  useEffect(() => {
    createDebounce(saveLabelValue, 800);
  }, [saveLabelValue]);

  useKeyboardShortcut(['Delete'], () => deleteComponent());

  return (
    <div>
      <Container
        title={"Selected Component"}
        content={
          selectedComponent && (
            <div className="selectedData">
              <div className="selectedHeader">
                <span className="selectedKind">
                  Kind: {selectedComponent.kind.name}
                </span>
                <div className="selectedDelete" onClick={deleteComponent}>
                  <FaTrashAlt />
                </div>
              </div>
              <i className="fas fa-trash-alt"></i>
              <div>
                <span className="selectedKind">Label:</span>
                <input
                  className="selectedLabel"
                  value={label}
                  style={{ width: "100px" }}
                  onChange={handleLabelChange}
                />
              </div>
              <div className="selectedPorts">
                {selectedComponent.inputs && selectedComponent.inputs.length ? (
                  <div className="selectedPortsValues">
                    <span>Inputs:</span>
                    {selectedComponent.inputs.map((portID) => {
                      const port = getPortData(portID);
                      return (
                        <li className="portPowerItem" key={port.id}>
                          <span>{port.power.toFixed(4)}</span>
                        </li>
                      );
                    })}
                  </div>
                ) : null}
                {selectedComponent.outputs &&
                selectedComponent.outputs.length ? (
                  <div className="selectedPortsValues">
                    {selectedComponent.kind.kind !== "power_source" ? (
                      <InspectionOutputs
                        selectedComponent={selectedComponent}
                      />
                    ) : (
                      <PowerSourceInspectionOutputs
                        selectedComponent={selectedComponent}
                      />
                    )}
                  </div>
                ) : null}
              </div>
              <div className="selectedPorts">
                <div className="selectedPortsValues">
                  <span>X: {selectedComponent.x}</span>
                </div>
                <div className="selectedPortsValues">
                  <span>Y: {selectedComponent.y}</span>
                </div>
              </div>
              {selectedComponent.kind.kind !== "output_reader" ? (
                <button
                  onClick={() =>
                    calculateOutputs(
                      selectedComponent.id,
                      selectedComponent.outputs
                    )
                  }
                >
                  Calculate Outputs
                </button>
              ) : null}
            </div>
          )
        }
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedComponent: state.circuitComponent.selected,
});

const mapDispatchToProps = (dispatch) => ({
  calculateOutputs: bindActionCreators(calculateOutputs, dispatch),
  deleteComponent: bindActionCreators(deleteSelected, dispatch),
  setSelectedComponentLabel: bindActionCreators(
    setSelectedComponentLabel,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedComponent);
