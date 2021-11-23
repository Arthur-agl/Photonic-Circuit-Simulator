import React, { useEffect, useState } from "react";
import ComponentsPanel from "../components/panels/componentsPanel";
import InspectionPanel from "../components/panels/inspectionPanel";
import MainMenu from "../components/menus/mainMenu";
import Workspace from "../components/workspace";
import AnalyticsPanel from "../components/panels/analyticsPanel";
import "./styles.css";
import api from "../api";
import {
  create as createCircuit,
  attemptSetLabel as setCircuitLabel,
  attemptChangeCurrent as attemptChangeCurrentCircuit,
  simulate,
  deleteCircuit,
} from "../store/ducks/circuit";
import { basicKinds } from "../utils/componentBehaviour";
import Tabs from "../components/tabs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DropdownMenu from "../components/menus/dropdownMenu";
import { FileButton, EditButton } from "./MainMenuButtons";

const buttons = [FileButton, EditButton];
const INITIAL_WORKSPACE_HEIGHT = window.innerHeight - 8;

const Layout = ({
  circuits,
  setCircuitLabel,
  currentCircuitID,
  attemptChangeCurrentCircuit,
  createCircuit,
  circuitComponents,
  deleteCircuit,
  simulate,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentButton, setCurrentButton] = useState(null);
  const [left, setLeft] = useState(0);
  const [currentComponents, setCurrentComponents] = useState([]);
  const [currentConnections, setCurrentConnections] = useState([]);
  const [customComponents, setCustomComponents] = useState([]);
  const [workspaceHeightOffset, setWorkspaceHeightOffset] = useState(0);
  const [analyticsHeight, setAnalyticsHeight] = useState(0);

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
    const currentCircuit = circuits.find(
      (circuit) => circuit.id === currentCircuitID
    );
    if (currentCircuit) {
      setCurrentComponents(
        circuitComponents.filter((component) =>
          currentCircuit.components.includes(component.id)
        )
      );
      setCurrentConnections(currentCircuit.connections);
    }
  }, [currentCircuitID, circuits, circuitComponents]);

  const handleCloseTab = async (id) => {
    const response = await api.closeCircuitTab(id);

    if (response.ok) {
      deleteCircuit(id);
    }
  };

  const handleChangeHeightOffset = (heightOffset) => {
    setWorkspaceHeightOffset(heightOffset);
  };

  const handleChangeAnalyticsHeight = (newAnalyticsHeight) => {
    setAnalyticsHeight(newAnalyticsHeight);
  };

  return (
    <div className="main">
      <MainMenu
        buttons={buttons}
        onClick={onClickMenuButton}
        onMouseEnter={onMouseEnterMenuButton}
      />
      <DropdownMenu
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        items={currentButton ? currentButton.items : []}
        left={left}
      />
      <div className="screen">
        <ComponentsPanel
          basicComponents={basicKinds}
          customComponents={customComponents}
        />
        <div className="centerContainer">
          <Tabs
            activeTab={currentCircuitID}
            setActiveTab={(id) => attemptChangeCurrentCircuit(id)}
            setTitle={setCircuitLabel}
            handleCloseTab={handleCloseTab}
          >
            {circuits.map((circuit) => (
              <div
                id={circuit.id}
                label={circuit.label}
                isSaved={circuit.isSaved}
                key={circuit.id}
              >
                <Workspace
                  circuitComponents={currentComponents}
                  connections={currentConnections}
                  workspaceHeight={
                    INITIAL_WORKSPACE_HEIGHT -
                    workspaceHeightOffset -
                    analyticsHeight
                  }
                  handleChangeHeightOffset={handleChangeHeightOffset}
                />
              </div>
            ))}
          </Tabs>
          <AnalyticsPanel
            analyticsHeight={analyticsHeight}
            handleChangeAnalyticsHeight={handleChangeAnalyticsHeight}
          />
        </div>
        <InspectionPanel simulate={simulate} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  circuits: state.circuit.instances,
  currentCircuitID: state.circuit.current,
  circuitComponents: state.circuitComponent.instances,
});

const mapDispatchToProps = (dispatch) => ({
  setCircuitLabel: bindActionCreators(setCircuitLabel, dispatch),
  attemptChangeCurrentCircuit: bindActionCreators(
    attemptChangeCurrentCircuit,
    dispatch
  ),
  createCircuit: bindActionCreators(createCircuit, dispatch),
  simulate: bindActionCreators(simulate, dispatch),
  deleteCircuit: bindActionCreators(deleteCircuit, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
