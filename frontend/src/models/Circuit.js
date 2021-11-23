export const DEFAULT_LABEL = "New Circuit";

const createCircuit = (id, label) => {
  return {
    id: id,
    label: label,
    components: [],
    connections: [],
    isSaved: false,
    past: [],
    future: []
  };
};

export default createCircuit;
