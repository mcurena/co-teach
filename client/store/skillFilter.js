const SET_SKILL_FILTER = "SET_SKILL_FILTER";
const CLEAR_SKILL_FILTER = "CLEAR_SKILL_FILTER";

const defaultFilter = "";

export const setSkillFilter = filter => ({
  type: SET_SKILL_FILTER,
  filter
});

export const clearSkillFilter = () => ({
  type: CLEAR_SKILL_FILTER
});

export default function(state = defaultFilter, action) {
  switch (action.type) {
    case SET_SKILL_FILTER:
      return action.filter;
    case CLEAR_SKILL_FILTER:
      return defaultFilter;
    default:
      return state;
  }
}
