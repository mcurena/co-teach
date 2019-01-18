import axios from "axios";

const GET_STUDENTS = "GET_STUDENTS";

const defaultStudents = [];

const getStudents = students => ({ type: GET_STUDENTS, students });

export const loadStudents = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/students");
    dispatch(getStudents(data || defaultStudents));
  } catch (err) {
    console.error(err);
  }
};

export default function(state = defaultStudents, action) {
  switch (action.type) {
    case GET_STUDENTS:
      return action.students;
    default:
      return state;
  }
}
