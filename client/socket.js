import io from "socket.io-client";
import store, {
  addGroupNote,
  assignUser,
  addDate,
  groupCreated,
  addObservation,
  update
} from "./store";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("Connected!");
});

socket.on("add-group-note", data => {
  store.dispatch(addGroupNote(data));
});

socket.on("assign-user", data => {
  store.dispatch(assignUser(data));
});

socket.on("add-date-group", data => {
  store.dispatch(addDate(data));
});

socket.on("group-created", data => {
  store.dispatch(groupCreated(data));
});

socket.on("add-observation", data => {
  store.dispatch(addObservation(data));
});

socket.on("update-students", data => {
  store.dispatch(update(data));
});

export default socket;
