import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { addObservationServer } from "../store";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justify: "center",
    alignContent: "center",
    alignItems: "space-around",
    width: "100%"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 100
  },
  justAdded: {
    height: "15vw",
    display: "flex",
    flexDirection: "row",
    justify: "center",
    alignItems: "center",
    alignContent: "center"
  }
});

class StudentNote extends React.Component {
  state = {
    rating: "",
    note: "",
    justAdded: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  async handleSubmit(evt) {
    evt.preventDefault();
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
      skill: this.props.group.skill,
      rating: this.state.rating,
      method: "Group",
      note: this.state.note,
      student: this.props.student.id,
      user: this.props.user.id,
      group: this.props.group.id,
      date
    });

    this.setState({
      justAdded: true,
      rating: "",
      note: ""
    });
  }

  handleRerender() {
    this.setState({
      justAdded: false
    });
  }

  render() {
    const { classes, student } = this.props;

    const { justAdded } = this.state;

    return (
      <div className={classes.container}>
        {" "}
        {justAdded ? (
          <Paper className={classes.container}>
            <div className={classes.justAdded}>
              <center>
                <Typography>Thank you for your note!</Typography>
              </center>
            </div>
          </Paper>
        ) : (
          <div className={classes.container}>
            <Paper className={classes.container}>
              <center>
                <Typography align="center" component="h2">
                  Add note on {student.name}
                </Typography>
              </center>

              <form
                className={classes.container}
                noValidate
                autoComplete="off"
                onSubmit={evt => this.handleSubmit(evt)}
              >
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

StudentNote.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapState = state => ({
  user: state.user
});

const mapDispatch = dispatch => ({
  addObservationServer: info => dispatch(addObservationServer(info))
});

export default connect(mapState, mapDispatch)(withStyles(styles)(StudentNote));
