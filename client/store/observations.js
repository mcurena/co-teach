import axios from "axios";
import socket from "../socket";

const GET_OBSERVATIONS = "GET_OBSERVATIONS";
const ADD_OBSERVATION = "ADD_OBSERVATION";

const defaultObservations = [];

export const getObservations = observations => ({
  type: GET_OBSERVATIONS,
  observations
});

export const addObservation = newObservation => ({
  type: ADD_OBSERVATION,
  newObservation
});

export const loadObservations = () => async dispatch => {
  const { data } = await axios.get("/api/observations");
  dispatch(getObservations(data || defaultObservations));
};

export const addObservationServer = info => async dispatch => {
  const { data } = await axios.post("/api/observations/add", info);
  dispatch(addObservation(data || {}));
  socket.emit("add-observation", data);
};

export default function(state = defaultObservations, action) {
  const newState = [...state];
  switch (action.type) {
    case GET_OBSERVATIONS:
      return action.observations;
    case ADD_OBSERVATION:
      newState.push(action.newObservation);
      return newState;
    default:
      return state;
  }
}
