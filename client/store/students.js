import axios from "axios";
import socket from "../socket";

const GET_STUDENTS = "GET_STUDENTS";
const UPDATE_STUDENTS = "UPDATE_STUDENTS";
const ADD_RATING = "ADD_RATING";

const defaultStudents = [];

const getStudents = students => ({ type: GET_STUDENTS, students });

export const update = ids => ({
  type: UPDATE_STUDENTS,
  ids
});

export const addRating = student => ({
  type: ADD_RATING,
  student
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
    case ADD_RATING:
      return students.map(student => {
        if (student.id === action.student.id) {
          return action.student;
        } else {
          return student;
        }
      });
    default:
      return state;
  }
}
