import createPorts from "../../models/Port";

// Action Types
export const Types = {
  CREATE: "port/CREATE",
  SET_WORLD_TRANSFORM: "port/SET_WORLD_TRANSFORM",
  SET_CONNECTED: "port/SET_CONNECTED",
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
        instances: state.instances.concat(createPorts(action.payload.ports, action.payload.parentKind, action.payload.isInput)),
      };
    case Types.SET_WORLD_TRANSFORM:
      return {
        ...state,
        instances: state.instances.map((content) =>
          content.id === action.payload.id
            ? {
                ...content,
                worldX: content.x + action.payload.parentX,
                worldY: content.y + action.payload.parentY
              }
            : content
        ),
      }
    case Types.SET_CONNECTED:
      return {
        ...state,
        instances: state.instances.map((content) =>
          content.id === action.payload.id
            ? {
                ...content,
                target: action.payload.targetPortID
              }
            : content
        ),
      }
    default:
      return state;
  }
}

// Action Creators
export function create(ports, parentKind, isInput = true) {
  return {
    type: Types.CREATE,
    payload: {
      ports: ports,
      parentKind: parentKind,
      isInput: isInput,
    },
  };
}

export function setWorldTransform(id, parentX, parentY){
  return {
    type: Types.SET_WORLD_TRANSFORM,
    payload: {
      id: id,
      parentX: parentX,
      parentY: parentY
    }
  }
}

export function setConnected(id, targetPortID){
  return {
    type: Types.SET_CONNECTED,
    payload: {
      id: id,
      targetPortID: targetPortID
    }
  }
}
