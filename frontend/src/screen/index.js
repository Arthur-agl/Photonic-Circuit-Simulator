import React, { useEffect, useState } from "react";
import ComponentsMenu from "../components/componentsMenu";
import InspectionMenu from "../components/inspectionMenu";
import MainMenu from "../components/mainMenu";
import Workspace from "../components/workspace";
import "./styles.css";
import api from "../api";
import {
  create as createCircuit,
  attemptSetLabel as setCircuitLabel,
  attemptChangeCurrent as attemptChangeCurrentCircuit,
  simulate,
} from "../store/ducks/circuit";
import { basicKinds } from "../utils/componentBehaviour";
import Tabs from "../components/tabs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DropdownMenu from "../components/dropdownMenu";
import { FileButton, EditButton } from './MainMenuButtons';

const buttons = [
  FileButton,
  EditButton
];

export let WORKSPACE_X = 0;
export let WORKSPACE_Y = 0;

const Layout = ({
  circuits,
  setCircuitLabel,
  currentCircuitID,
  attemptChangeCurrentCircuit,
  createCircuit,
  circuitComponents,
  ports,
  simulate,
}) => {

  const [showDropdown, setShowDropdown] = useState(false);
  const [currentButton, setCurrentButton] = useState(null);
  const [left, setLeft] = useState(0);
  const [currentComponents, setCurrentComponents] = useState([]);
  const [currentConnections, setCurrentConnections] = useState([]);
  const [customComponents, setCustomComponents] = useState([]);

  const onClickMenuButton = () => {
    setShowDropdown(!showDropdown);
  };

  const onMouseEnterMenuButton = (index) => {
    setCurrentButton(buttons[index]);
    const element = document.getElementById(buttons[index].name);
    setLeft(element.getBoundingClientRect().left);
  };

  useEffect(() => {
    async function startConnection() {
      const response = await api.resetCircuits();
      if (response.ok) {
        createCircuit();
      }
    }

    startConnection();
  }, [createCircuit]);

  useEffect(() => {
    const currentCircuit = circuits.find((circuit) => circuit.id === currentCircuitID);
    if (currentCircuit) {
      setCurrentComponents(circuitComponents.filter((component) => currentCircuit.components.includes(component.id)));
      setCurrentConnections(currentCircuit.connections);
    }
  }, [currentCircuitID, circuits, circuitComponents]);

  return (
    <div className="main">
      <MainMenu buttons={buttons} onClick={onClickMenuButton} onMouseEnter={onMouseEnterMenuButton} />
      <DropdownMenu showDropdown={showDropdown} setShowDropdown={setShowDropdown} items={currentButton ? currentButton.items : []} left={left} />
      <div className="screen">
        <ComponentsMenu basicComponents={basicKinds} customComponents={customComponents} />
        <Tabs activeTab={currentCircuitID} setActiveTab={(id) => attemptChangeCurrentCircuit(id)} setTitle={setCircuitLabel}>
          {circuits.map((circuit) => (
            <div
              id={circuit.id}
              label={circuit.label}
              isSaved={circuit.isSaved}
              key={circuit.id}
              ref={(element) => {
                if (!element) return;

                const rect = element.getBoundingClientRect();
                WORKSPACE_X = rect.x;
                WORKSPACE_Y = rect.y;
              }}
            >
              <Workspace circuitComponents={currentComponents} connections={currentConnections} heightOffset={WORKSPACE_Y} />
            </div>
          ))}
        </Tabs>
        <InspectionMenu
          outputReaders={currentComponents.filter((component) => component.kind.kind === "output_reader")}
          ports={ports}
          simulate={simulate}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  circuits: state.circuit.instances,
  currentCircuitID: state.circuit.current,
  circuitComponents: state.circuitComponent.instances,
  ports: state.port.instances,
});

const mapDispatchToProps = (dispatch) => ({
  setCircuitLabel: bindActionCreators(setCircuitLabel, dispatch),
  attemptChangeCurrentCircuit: bindActionCreators(attemptChangeCurrentCircuit, dispatch),
  createCircuit: bindActionCreators(createCircuit, dispatch),
  simulate: bindActionCreators(simulate, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
