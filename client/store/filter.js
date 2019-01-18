const SET_FILTER = "SET_FILTER";
const CLEAR_FILTER = "CLEAR_FILTER";

const defaultFilter = {};

export const setFilter = filter => ({
  type: SET_FILTER,
  filter
});

export const clearFilter = () => ({
  type: CLEAR_FILTER
});

export default function(state = defaultFilter, action) {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    case CLEAR_FILTER:
      return defaultFilter;
    default:
      return state;
  }
}
