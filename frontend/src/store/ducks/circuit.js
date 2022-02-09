import createCircuit, { DEFAULT_LABEL } from "../../models/Circuit";

// Action Types
export const Types = {
  CREATE: "circuit/CREATE",
  CREATE_WITH_ID: "circuit/CREATE_WITH_ID",
  SET_CURRENT: "circuit/SET_CURRENT",
  ATTEMPT_CHANGE_CURRENT: "circuit/ATTEMPT_CHANGE_CURRENT",
  SAVE: "circuit/SAVE",
  ATTEMPT_SAVE: "circuit/ATTEMPT_SAVE",
  ADD_COMPONENT: "circuit/ADD_COMPONENT",
  SIMULATE: "circuit/SIMULATE",
  SET_LABEL: "circuit/SET_LABEL",
  ATTEMPT_SET_LABEL: "circuit/ATTEMPT_SET_LABEL",
  SET_SAVED: "circuit/SET_SAVED",
  ADD_CONNECTION: "circuit/ADD_CONNECTION",
  DELETE_CONNECTION: "circuit/DELETE_CONNECTION",
  LOAD: "circuit/LOAD",
  CREATE_WITH_DATA: "circuit/CREATE_WITH_DATA",
  UPDATE_CONNECTION_POS: "circuit/UPDATE_CONNECTION_POS",
  DELETE: "circuit/DELETE",
  UNDO: "circuit/UNDO",
  REDO: "circuit/REDO"
};

// Reducer
const INITIAL_STATE = {
  instances: [],
  current: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CREATE_WITH_ID:
      return {
        ...state,
        instances: state.instances.concat([
          createCircuit(action.payload.id, action.payload.label),
        ]),
      };
    case Types.SET_CURRENT:
      return {
        ...state,
        current: action.payload.id,
      };
    case Types.SAVE:
      return {
        ...state,
        instances: state.instances.map((content) =>
          content.id === state.current
            ? {
                ...content,
                isSaved: true,
              }
            : content
        ),
      };
    case Types.ADD_COMPONENT:
      return {
        ...state,
        instances: state.instances.map((content) =>
          content.id === state.current
            ? {
                ...content,
                past: content.past.concat({
                  id: content.id,
                  label: content.label,
                  components: content.components,
                  connections: content.connections
                }),
                components: content.components.concat([
                  action.payload.component_id,
                ]),
              }
            : content
        ),
      };
    case Types.SET_LABEL:
      return {
        ...state,
        instances: state.instances.map((content) =>
          content.id === state.current
            ? {
                ...content,
                past: content.past.concat({
                  id: content.id,
                  label: content.label,
                  components: content.components,
                  connections: content.connections
                }),
                label: action.payload.label,
              }
            : content
        ),
      };
    case Types.SET_SAVED:
      return {
        ...state,
        instances: state.instances.map((content) =>
          content.id === state.current
            ? {
                ...content,
                isSaved: action.payload.saved,
              }
            : content
        ),
      };
    case Types.ADD_CONNECTION:
      return {
        ...state,
        instances: state.instances.map((content) =>
          content.id === state.current
            ? {
                ...content,
                past: content.past?.concat({
                  id: content.id,
                  label: content.label,
                  components: content.components,
                  connections: content.connections
                }),
                connections: content.connections.concat([
                  action.payload.connection,
                ]),
              }
            : content
        ),
      };
    case Types.DELETE_CONNECTION:
      return {
        ...state,
        instances: state.instances.map((content) =>
          content.id === state.current
            ? {
                ...content,
                past: content.past.concat({
                  id: content.id,
                  label: content.label,
                  components: content.components,
                  connections: content.connections
                }),
                connections: content.connections.filter(
                  (connection) =>
                    connection.targetPortID !== action.payload.portID &&
                    connection.originPortID !== action.payload.portID
                ),
              }
            : content
        ),
      };
    case Types.CREATE_WITH_DATA:
      return {
        ...state,
        instances: state.instances.concat([action.payload.data]),
        current: action.payload.data.id,
      };
    case Types.UPDATE_CONNECTION_POS:
      return {
        ...state,
        instances: state.instances.map((content) =>
          content.id === state.current
            ? {
                ...content,
                past: content.past.concat({
                  id: content.id,
                  label: content.label,
                  components: content.components,
                  connections: content.connections
                }),
                connections: content.connections.map((connection) =>
                  connection.originPortID === action.payload.portID
                    ? {
                        ...connection,
                        points: [
                          action.payload.newX,
                          action.payload.newY,
                          connection.points[2],
                          connection.points[3],
                        ],
                      }
                    : connection.targetPortID === action.payload.portID
                    ? {
                        ...connection,
                        points: [
                          connection.points[0],
                          connection.points[1],
                          action.payload.newX,
                          action.payload.newY,
                        ],
                      }
                    : connection
                ),
              }
            : content
        ),
      };
    case Types.DELETE:
      return {
        ...state,
        instances: state.instances.filter(
          (instance) => instance.id !== action.payload.id
        ),
      };
    case Types.UNDO:
      return {
        ...state,
        instances: state.instances.map((content) =>
          content.id === state.current && content.past !== false
            ? {
                ...content,
                future: [{
                  id: content.id,
                  label: content.label,
                  components: content.components,
                  connections: content.connections
                }, ...content.future],

                id: content.past.slice(-1)[0].id,
                label: content.past.slice(-1)[0].label,
                components: content.past.slice(-1)[0].components,
                connections: content.past.slice(-1)[0].connections,

                past: content.past.slice(0,-1),
              }
            : content
        ),
      }
    case Types.REDO:
      return {
        ...state,
        instances: state.instances.map((content) =>
          content.id === state.current && content.future !== false
            ? {
                ...content,
                past: [...content.past, {
                  id: content.id,
                  label: content.label,
                  components: content.components,
                  connections: content.connections
                }],

                id: content.future[0].id,
                label: content.future[0].label,
                components: content.future[0].components,
                connections: content.future[0].connections,

                future: content.future.slice(1),
              }
            : content
        ),
      }
    default:
      return state;
  }
}

// Action Creators
export function create() {
  return {
    type: Types.CREATE,
    payload: {
      id: null,
      label: DEFAULT_LABEL,
    },
  };
}

export function createWithID(id) {
  return {
    type: Types.CREATE_WITH_ID,
    payload: {
      id: id,
      label: DEFAULT_LABEL,
    },
  };
}

export function setCurrent(id) {
  return {
    type: Types.SET_CURRENT,
    payload: {
      id: id,
    },
  };
}

export function attemptChangeCurrent(id) {
  return {
    type: Types.ATTEMPT_CHANGE_CURRENT,
    payload: {
      id: id,
    },
  };
}

export function save() {
  return {
    type: Types.SAVE,
    payload: {},
  };
}

export function attemptSave() {
  return {
    type: Types.ATTEMPT_SAVE,
    payload: {},
  };
}

export function addComponent(component_id) {
  return {
    type: Types.ADD_COMPONENT,
    payload: {
      component_id: component_id,
    },
  };
}

export function simulate() {
  return {
    type: Types.SIMULATE,
    payload: {},
  };
}

export function setLabel(label) {
  return {
    type: Types.SET_LABEL,
    payload: {
      label: label,
    },
  };
}

export function attemptSetLabel(label) {
  return {
    type: Types.ATTEMPT_SET_LABEL,
    payload: {
      label: label,
    },
  };
}

export function setSaved(saved) {
  return {
    type: Types.SET_SAVED,
    payload: {
      saved: saved,
    },
  };
}

export function addConnection(connection) {
  return {
    type: Types.ADD_CONNECTION,
    payload: {
      connection: connection,
    },
  };
}

export function deleteConnection(portID) {
  return {
    type: Types.DELETE_CONNECTION,
    payload: {
      portID: portID,
    },
  };
}

export function load(id) {
  return {
    type: Types.LOAD,
    payload: {
      id: id,
    },
  };
}

export function createWithData(data) {
  return {
    type: Types.CREATE_WITH_DATA,
    payload: {
      data: data,
    },
  };
}

export function updateConnectionPos(portID, newX, newY) {
  return {
    type: Types.UPDATE_CONNECTION_POS,
    payload: {
      portID: portID,
      newX: newX,
      newY: newY,
    },
  };
}

export function deleteCircuit(id) {
  return {
    type: Types.DELETE,
    payload: {
      id: id,
    },
  };
}

export function undo() {
  return {
    type: Types.UNDO,
    payload: {}
  }
}

export function redo() {
  return {
    type: Types.REDO,
    payload: {}
  }
}