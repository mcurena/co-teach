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
    skill: "",
    rating: "",
    method: "",
    note: "",
    studentName: "",
    justAdded: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
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
    const { classes, students } = this.props;
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
    const studentList = students
      .reduce((accum, student) => {
        return accum.concat([student.name]);
      }, [])
      .sort();

    const { justAdded } = this.state;

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
              <Link to="/groupAdd">
                <Button>Add notes about group</Button>
              </Link>
            </div>
            <Paper>
              <Typography align="center" component="h2">
                Add note on student
              </Typography>
              <br />
              <form
                className={classes.container}
                noValidate
                autoComplete="off"
                onSubmit={evt => this.handleSubmit(evt)}
              >
                <TextField
                  id="student"
                  select
                  label="Student"
                  className={classes.textField}
                  value={this.state.studentName}
                  onChange={this.handleChange("studentName")}
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
                  {studentList.map(student => (
                    <option value={student} key={student}>
                      {student}
                    </option>
                  ))}
                </TextField>

                <TextField
                  id="skill"
                  select
                  label="Skill"
                  className={classes.textField}
                  value={this.state.skill}
                  onChange={this.handleChange("skill")}
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
                  {Object.keys(skills)
                    .sort()
                    .map(skill => (
                      <option value={skills[skill]} key={skill}>
                        {skill}
                      </option>
                    ))}
                </TextField>

                <TextField
                  id="rating"
                  select
                  label="Rating"
                  className={classes.textField}
                  value={this.state.rating}
                  onChange={this.handleChange("rating")}
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
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </TextField>

                <TextField
                  id="method"
                  select
                  label="Method"
                  className={classes.textField}
                  value={this.state.method}
                  onChange={this.handleChange("method")}
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
                  <option value="Individual">Individual</option>
                  <option value="Group">Group</option>
                  <option value="Formal">Formal</option>
                  <option value="Informal">Informal</option>
                </TextField>

                <TextField
                  id="outlined-textarea"
                  label="Add Note"
                  placeholder="Add Note"
                  multiline
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={this.state.note}
                  onChange={this.handleChange("note")}
                />
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
