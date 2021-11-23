import React from "react";
import Collection from "../../collection";
import { create } from "../../../store/ducks/circuitComponent";
import "./styles.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const ComponentsPanel = ({ basicComponents, customComponents, addComponent }) => {
  return (
    <div className="componentsMenu">
      <span className="componentsMenuTitle">Components</span>
      <Collection items={basicComponents} onClick={addComponent} title={"Basic Components"} scrollable />
      <Collection items={customComponents} onClick={addComponent} title={"Custom Components"} scrollable />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addComponent: bindActionCreators(create, dispatch),
});

export default connect(null, mapDispatchToProps)(ComponentsPanel);
