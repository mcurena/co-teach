import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import {
  addObservationServer,
  addDateServer,
  groupCreatedServer
} from "../store";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import StudentNote from "./StudentNote";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "80vw"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 0
  },
  menu: {
    width: 200
  }
});

class AddMultipleNotes extends React.Component {
  state = {
    justAdded: false,
    chosenGroup: "",
    groupId: ""
  };
  async componentWillUnmount() {
    await this.createGroup();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleGroupChoice = evt => {
    const chosenGroup = this.props.groups.find(
      group => group.id === Number(evt.target.value)
    );
    this.setState({
      chosenGroup,
      groupId: evt.target.value
    });
  };

  async handleSubmit() {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    const date = mm + "/" + dd;
    await this.props.addDateServer(this.state.groupId, date);
    this.setState({
      justAdded: true,
      chosenGroup: "",
      groupId: ""
    });
  }

  handleRerender() {
    this.setState({
      justAdded: false
    });
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
  }

  render() {
    const { classes, groups, user } = this.props;
    const skills = {
      authorsPurpose: "Author's Purpose",
      mainIdea: "Main Idea",
      traitsEmotions: "Traits & Emotions",
      figurativeLanguage: "Figurative Language",
      textFeatures: "Text Features",
      textStructures: "Text Structures",
      contextClues: "Context Clues",
      theme: "Theme",
      pov: "Point of View"
    };

    const { justAdded, chosenGroup } = this.state;
    const groupList = groups
      .filter(group => group.user && group.user.id === user.id)
      .filter(group => group.active);
    return (
      <center>
        <div className={classes.container}>
          <center>
            {" "}
            {justAdded ? (
              <Paper className={classes.container}>
                <div>
                  <Typography>Thank you for your notes!</Typography>
                  <Button onClick={() => this.handleRerender()}>
                    Add more
                  </Button>
                </div>
              </Paper>
            ) : (
              <div>
                <div align="right">
                  <Link to="/add">
                    <Button>Add note on student</Button>
                  </Link>
                </div>
                <div className={classes.container}>
                  <Paper className={classes.container}>
                    <Typography align="center" component="h2">
                      Choose your group
                    </Typography>
                    <br />

                    <TextField
                      id="group"
                      select
                      label="Group"
                      className={classes.textField}
                      value={this.state.groupId}
                      onChange={evt => this.handleGroupChoice(evt)}
                      SelectProps={{
                        native: true,
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      margin="normal"
                      variant="outlined"
                    >
                      <option value="" />
                      {groupList.length ? (
                        groupList.map(group => (
                          <option value={group.id} key={group.id}>
                            Skill: {skills[group.skill]} - Students:{" "}
                            {group.students
                              .reduce(
                                (accum, student) =>
                                  accum.concat([student.name]),
                                []
                              )
                              .join(", ")}
                          </option>
                        ))
                      ) : (
                        <option value="none">
                          There are no groups assigned to you.
                        </option>
                      )}
                    </TextField>

                    {chosenGroup
                      ? chosenGroup.students.map(student => (
                          <StudentNote
                            group={chosenGroup}
                            student={student}
                            key={student.name}
                          />
                        ))
                      : ""}
                    <Button onClick={() => this.handleSubmit()}>Done</Button>
                  </Paper>
                </div>
              </div>
            )}
          </center>
        </div>
      </center>
    );
  }
}

AddMultipleNotes.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapState = state => ({
  user: state.user,
  students: state.students,
  groups: state.groups
});

const mapDispatch = dispatch => ({
  addObservationServer: info => dispatch(addObservationServer(info)),
  addDateServer: (id, date) => dispatch(addDateServer(id, date)),
  groupCreatedServer: (ids, skill, rating) =>
    dispatch(groupCreatedServer(ids, skill, rating))
});

export default connect(mapState, mapDispatch)(
  withStyles(styles)(AddMultipleNotes)
);
