import axios from "axios";

const GET_GROUPS = "GET_GROUPS";
const ADD_GROUP_NOTE = "ADD_GROUP_NOTE";
const ASSIGN_USER = "ASSIGN_USER";

const defaultGroups = [];

const getGroups = groups => ({
  type: GET_GROUPS,
  groups
});

const addGroupNote = group => ({
  type: ADD_GROUP_NOTE,
  group
});

const assignUser = group => ({
  type: ASSIGN_USER,
  group
});

export const loadGroups = () => async dispatch => {
  const { data } = await axios.get("/api/groups");
  dispatch(getGroups(data || defaultGroups));
};

export const addGroupNoteServer = info => async dispatch => {
  const { data } = await axios.post("/api/groups/addNote", info);
  dispatch(addGroupNote(data || {}));
};

export const assignUserServer = id => async dispatch => {
  const { data } = await axios.post("/api/groups/assignUser", { id });
  dispatch(assignUser(data || {}));
};

export default function(state = defaultGroups, action) {
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
    default:
      return state;
  }
}
