import axios from "axios";
import socket from "../socket";

const GET_GROUPS = "GET_GROUPS";
const ADD_GROUP_NOTE = "ADD_GROUP_NOTE";
const ASSIGN_USER = "ASSIGN_USER";
const ADD_DATE = "ADD_DATE";
const GROUP_CREATED = "GROUP_CREATED";

const defaultGroups = [];

const getGroups = groups => ({
  type: GET_GROUPS,
  groups
});

export const addGroupNote = group => ({
  type: ADD_GROUP_NOTE,
  group
});

export const assignUser = group => ({
  type: ASSIGN_USER,
  group
});

export const addDate = group => ({
  type: ADD_DATE,
  group
});

export const groupCreated = group => ({
  type: GROUP_CREATED,
  group
});

export const loadGroups = () => async dispatch => {
  const { data } = await axios.get("/api/groups");
  dispatch(getGroups(data || defaultGroups));
};

export const addGroupNoteServer = info => async dispatch => {
  const { data } = await axios.put("/api/groups/addNote", info);
  dispatch(addGroupNote(data || {}));
  socket.emit("add-group-note", data);
};

export const assignUserServer = id => async dispatch => {
  const { data } = await axios.put("/api/groups/assignUser", { id });
  dispatch(assignUser(data || {}));
  socket.emit("assign-user", data);
};

export const addDateServer = (id, date) => async dispatch => {
  const { data } = await axios.put("/api/groups/addDate", { id, date });
  dispatch(addDate(data || {}));
  socket.emit("add-date-group", data);
};

export const groupCreatedServer = (ids, skill, rating) => async dispatch => {
  const { data } = await axios.post("/api/groups/create", {
    ids,
    skill,
    rating
  });
  dispatch(groupCreated(data || {}));
  socket.emit("group-created", data);
};

export default function(state = [], action) {
  const groups = [...state];

  switch (action.type) {
    case GET_GROUPS:
      return action.groups;
    case ADD_GROUP_NOTE:
      return groups.map(group => {
        if (group.id === action.group.id) {
          return action.group;
        } else {
          return group;
        }
      });
    case ASSIGN_USER:
      return groups.map(group => {
        if (group.id === action.group.id) {
          return action.group;
        } else {
          return group;
        }
      });
    case ADD_DATE:
      return groups.map(group => {
        if (group.id === action.group.id) {
          return action.group;
        } else {
          return group;
        }
      });
    case GROUP_CREATED:
      groups.push(action.group);
      return groups;
    default:
      return state;
  }
}
