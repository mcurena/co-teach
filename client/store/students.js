import axios from "axios";
import socket from "../socket";

const GET_STUDENTS = "GET_STUDENTS";
const UPDATE_STUDENTS = "UPDATE_STUDENTS";

const defaultStudents = [];

const getStudents = students => ({ type: GET_STUDENTS, students });

export const update = ids => ({
  type: UPDATE_STUDENTS,
  ids
});

export const loadStudents = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/students");
    dispatch(getStudents(data || defaultStudents));
  } catch (err) {
    console.error(err);
  }
};

export const updateStudents = ids => dispatch => {
  dispatch(update(ids));
  socket.emit("update-students", ids);
};

export default function(state = [], action) {
  const students = [...state];
  let updatedStudents;
  let oldStudents;
  if (action.ids) {
    updatedStudents = students
      .filter(student => action.ids.includes(student.id))
      .map(student => {
        student.currentlyPlaced = true;
        return student;
      });
    oldStudents = students.filter(student => !action.ids.includes(student.id));
  }
  switch (action.type) {
    case GET_STUDENTS:
      return action.students;
    case UPDATE_STUDENTS:
      return oldStudents.concat(updatedStudents);
    default:
      return state;
  }
}
