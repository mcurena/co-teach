import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { addObservationServer } from "../store";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

class AddNote extends React.Component {
  state = {
    justAdded: false,
    chosenGroup: "",
    groupId: ""
  };

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

  async handleSubmit(evt) {
    evt.preventDefault();
    const student = this.props.students.find(
      s => s.name === this.state.studentName
    ).id;
    let group = null;
    let namesInGroup = this.props.groups.map(g => ({
      id: g.id,
      students: g.students.reduce((accum, s) => {
        return accum.concat([s.name]);
      }, []),
      skill: g.skill
    }));

    if (this.state.method === "Group") {
      group = namesInGroup.find(
        g =>
          g.skill === this.state.skill &&
          g.students.includes(this.state.studentName)
      ).id;
    }

    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    const date = dd + "/" + mm;
    await this.props.addObservationServer({
      skill: this.state.skill,
      rating: this.state.rating,
      method: this.state.method,
      note: this.state.note,
      student,
      user: this.props.user.id,
      group,
      date
    });

    this.setState({
      justAdded: true,
      skill: "",
      rating: "",
      method: "",
      note: "",
      studentName: ""
    });
  }

  handleRerender() {
    this.setState({
      justAdded: false
    });
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
      <div className="container">
        {" "}
        {justAdded ? (
          <Paper>
            <div>
              <Typography>Thank you for your note!</Typography>
              <Button onClick={() => this.handleRerender()}>Add another</Button>
            </div>
          </Paper>
        ) : (
          <div>
            <div align="right">
              <Link to="/add">
                <Button>Add note on student</Button>
              </Link>
            </div>
            <Paper>
              <Typography align="center" component="h2">
                Add notes about group
              </Typography>
              <br />
              <form
                className={classes.container}
                noValidate
                autoComplete="off"
                onSubmit={evt => this.handleSubmit(evt)}
              >
                <Paper>
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
                    {groupList.map(group => (
                      <option value={group.id} key={group.id}>
                        Skill: {skills[group.skill]} - Students:{" "}
                        {group.students
                          .reduce(
                            (accum, student) => accum.concat([student.name]),
                            []
                          )
                          .join(", ")}
                      </option>
                    ))}
                  </TextField>
                </Paper>
                {chosenGroup
                  ? chosenGroup.students.map(student => (
                      <Paper key={student.name}>
                        <Typography>{student.name}</Typography>
                      </Paper>
                    ))
                  : ""}
                <Button type="submit">Submit</Button>
              </form>
            </Paper>
          </div>
        )}
      </div>
    );
  }
}

AddNote.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapState = state => ({
  user: state.user,
  students: state.students,
  groups: state.groups
});

const mapDispatch = dispatch => ({
  addObservationServer: info => dispatch(addObservationServer(info))
});

export default connect(mapState, mapDispatch)(withStyles(styles)(AddNote));
