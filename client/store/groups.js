import axios from "axios";

const GET_GROUPS = "GET_GROUPS";

const defaultGroups = [];

const getGroups = groups => ({
  type: GET_GROUPS,
  groups
});

export const loadGroups = () => async dispatch => {
  const { data } = await axios.get("/api/groups");
  dispatch(getGroups(data || defaultGroups));
};

export default function(state = defaultGroups, action) {
  switch (action.type) {
    case GET_GROUPS:
      return action.groups;
    default:
      return state;
  }
}
