import createPorts from "../../models/Port";

// Action Types
export const Types = {
  CREATE: "port/CREATE",
  SET_WORLD_TRANSFORM: "port/SET_WORLD_TRANSFORM",
  SET_CONNECTED: "port/SET_CONNECTED",
  CHANGE_POWER: "port/CHANGE_POWER",
  DELETE: "port/DELETE",
};

// Reducer
const INITIAL_STATE = {
  instances: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CREATE:
      return {
        ...state,
        instances: state.instances?.concat(
          createPorts(
            action.payload.ports,
            action.payload.parentID,
            action.payload.parentKind,
            action.payload.isInput
          )
        ),
      };
    case Types.SET_WORLD_TRANSFORM:
      return {
        ...state,
        instances: state.instances.map((content) =>
          content.id === action.payload.id
            ? {
                ...content,
                worldX: content.x + action.payload.parentX,
                worldY: content.y + action.payload.parentY,
              }
            : content
        ),
      };
    case Types.SET_CONNECTED:
      return {
        ...state,
        instances: state.instances.map((content) =>
          content.id === action.payload.id
            ? {
                ...content,
                target: action.payload.targetPortID,
              }
            : content
        ),
      };
    case Types.CHANGE_POWER:
      return {
        ...state,
        instances: state.instances.map((content) =>
          content.id === action.payload.id
            ? {
                ...content,
                power: action.payload.power,
              }
            : content
        ),
      };
    case Types.DELETE:
      return {
        ...state,
        instances: state.instances.filter((instance) => instance.id !== action.payload.id),
      };
    default:
      return state;
  }
}

// Action Creators
export function create(ports, parentID, parentKind, isInput = true) {
  return {
    type: Types.CREATE,
    payload: {
      ports: ports,
      parentID: parentID,
      parentKind: parentKind,
      isInput: isInput,
    },
  };
}

export function setWorldTransform(id, parentX, parentY) {
  return {
    type: Types.SET_WORLD_TRANSFORM,
    payload: {
      id: id,
      parentX: parentX,
      parentY: parentY,
    },
  };
}

export function setConnected(id, targetPortID) {
  return {
    type: Types.SET_CONNECTED,
    payload: {
      id: id,
      targetPortID: targetPortID,
    },
  };
}

export function changePower(id, power) {
  return {
    type: Types.CHANGE_POWER,
    payload: {
      id: id,
      power: power,
    },
  };
}

export function deletePort(id) {
  return {
    type: Types.DELETE,
    payload: {
      id: id,
    },
  };
}
