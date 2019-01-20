const SET_ACTIVE_FILTER = "SET_ACTIVE_FILTER";
const CLEAR_ACTIVE_FILTER = "CLEAR_ACTIVE_FILTER";

const defaultFilter = "";

export const setActiveFilter = filter => ({
  type: SET_ACTIVE_FILTER,
  filter
});

export const clearActiveFilter = () => ({
  type: CLEAR_ACTIVE_FILTER
});

export default function(state = defaultFilter, action) {
  switch (action.type) {
    case SET_ACTIVE_FILTER:
      return action.filter;
    case CLEAR_ACTIVE_FILTER:
      return defaultFilter;
    default:
      return state;
  }
}
