const SET_RATING_FILTER = "SET_FILTER";
const CLEAR_RATING_FILTER = "CLEAR_FILTER";

const defaultFilter = {};

export const setRatingFilter = filter => ({
  type: SET_RATING_FILTER,
  filter
});

export const clearRatingFilter = () => ({
  type: CLEAR_RATING_FILTER
});

export default function(state = defaultFilter, action) {
  switch (action.type) {
    case SET_RATING_FILTER:
      return action.filter;
    case CLEAR_RATING_FILTER:
      return defaultFilter;
    default:
      return state;
  }
}
