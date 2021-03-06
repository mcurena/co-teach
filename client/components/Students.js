import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FilterButton from "./FilterButton";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  clearSkillFilter,
  clearActiveFilter,
  groupCreatedServer
} from "../store";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  filters: {
    display: "flex",
    flexDirection: "row",
    justify: "center"
  }
});

class Students extends React.Component {
  async componentDidMount() {
    await this.createGroup();
  }

  async createGroup() {
    const availableStudents = this.props.students.filter(
      student => !student.currentlyPlaced
    );
    const nonos = [
      "id",
      "level",
      "name",
      "currentlyPlaced",
      "createdAt",
      "updatedAt",
      "teachNStudent"
    ];
    let potentialGroups = {};
    availableStudents.forEach(student => {
      for (let key in student) {
        if (!nonos.includes(key)) {
          if (!potentialGroups[key]) {
            potentialGroups[key] = {
              1: [],
              2: [],
              3: [],
              4: [],
              "Not rated": []
            };
            potentialGroups[key][student[key]].push(student.id);
          } else {
            potentialGroups[key][student[key]].push(student.id);
          }
        }
      }
    });

    const newGroups = [];
    for (let skill in potentialGroups) {
      if (potentialGroups.hasOwnProperty(skill)) {
        for (let rating in potentialGroups[skill]) {
          if (
            potentialGroups[skill].hasOwnProperty(rating) &&
            rating !== "Not rated"
          ) {
            if (potentialGroups[skill][rating].length > 3) {
              const newGroup = {
                ids: potentialGroups[skill][rating].slice(0, 4),
                skill,
                rating
              };
              newGroups.push(newGroup);
            }
          }
        }
      }
    }
    if (!newGroups.length) {
      return "";
    } else {
      await this.props.groupCreatedServer(
        newGroups[0].ids,
        newGroups[0].skill,
        newGroups[0].rating
      );
      await this.props.updateStudents(newGroups[0].ids);
    }
    this.createGroup();
  }

  componentWillUnmount() {
    this.props.clearSkillFilter();
    this.props.clearActiveFilter();
  }

  render() {
    const { classes, skillFilter, students, activeFilter } = this.props;
    const skills = {
      "Author's Purpose": "authorsPurpose",
      "Main Idea": "mainIdea",
      "Traits & Emotions": "traitsEmotions",
      "Figurative Language": "figurativeLanguage",
      "Text Features": "textFeatures",
      "Text Structures": "textStructures",
      "Context Clues": "contextClues",
      Theme: "theme",
      "Point of View": "pov"
    };

    students.sort((a, b) => {
      const keyA = a.name;
      const keyB = b.name;
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    let filteredStudents = students;
    if (activeFilter.length) {
      if (activeFilter === "Yes") {
        filteredStudents = students.filter(student => student.currentlyPlaced);
      } else {
        filteredStudents = students.filter(student => !student.currentlyPlaced);
      }
    }

    return (
      <div>
        <div className={classes.filters}>
          <Typography component="h4">Filter By: </Typography>
          <FilterButton filter="Skills" options={Object.keys(skills).sort()} />
          <FilterButton filter="Active" options={["Yes", "No"]} />
        </div>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Currently Placed?</TableCell>
                {skillFilter ? (
                  <TableCell key={skillFilter} align="center">
                    {skillFilter}
                  </TableCell>
                ) : (
                  Object.keys(skills)
                    .sort()
                    .map(skill => (
                      <TableCell key={skill} align="center">
                        {skill}
                      </TableCell>
                    ))
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map(student => (
                <TableRow key={student.id}>
                  <TableCell component="th" scope="row">
                    <Link to={`/students/${student.id}`}>{student.name}</Link>
                  </TableCell>
                  <TableCell align="center">
                    {student.currentlyPlaced ? "Yes" : "No"}
                  </TableCell>
                  {skillFilter ? (
                    <TableCell key={skillFilter} align="center">
                      {student[skills[skillFilter]]}
                    </TableCell>
                  ) : (
                    Object.values(skills)
                      .sort()
                      .map(skill => (
                        <TableCell key={skill} align="center">
                          {student[skill]}
                        </TableCell>
                      ))
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const mapState = state => ({
  students: state.students,
  skillFilter: state.skillFilter,
  activeFilter: state.activeFilter
});

const mapDispatch = dispatch => ({
  clearSkillFilter: () => dispatch(clearSkillFilter()),
  clearActiveFilter: () => dispatch(clearActiveFilter()),
  groupCreatedServer: (ids, skill, rating) =>
    dispatch(groupCreatedServer(ids, skill, rating))
});

Students.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapState, mapDispatch)(withStyles(styles)(Students));
