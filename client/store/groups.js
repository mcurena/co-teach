import axios from "axios";

const GET_GROUPS = "GET_GROUPS";
const ADD_GROUP_NOTE = "ADD_GROUP_NOTE";

const defaultGroups = [];

const getGroups = groups => ({
  type: GET_GROUPS,
  groups
});

const addGroupNote = group => ({
  type: ADD_GROUP_NOTE,
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
    default:
      return state;
  }
}
