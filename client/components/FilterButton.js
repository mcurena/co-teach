import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";
import {
  setSkillFilter,
  clearSkillFilter,
  setActiveFilter,
  clearActiveFilter
} from "../store";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class SimpleSelect extends React.Component {
  state = {
    labelWidth: 0,
    chosen: ""
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }

  handleChange = event => {
    if (this.props.filter === "Skills") {
      this.props.setSkillFilter(event.target.value);
    } else if (this.props.filter === "Active") {
      this.props.setActiveFilter(event.target.value);
    }

    this.setState({
      chosen: event.target.value
    });
    if (event.target.value === "none") {
      if (this.props.filter === "Skills") {
        this.props.clearSkillFilter();
      } else if (this.props.filter === "Active") {
        this.props.clearActiveFilter();
      }
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-simple"
          >
            {this.props.filter}
          </InputLabel>
          <Select
            value={this.state.chosen}
            onChange={this.handleChange}
            style={{ fontSize: "10pt" }}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name={this.props.filter}
                id="outlined-age-simple"
                style={{ fontSize: "10pt" }}
              />
            }
          >
            <MenuItem value="none" style={{ fontSize: "10pt" }}>
              None
            </MenuItem>
            {this.props.options.map(option => (
              <MenuItem
                key={option}
                value={option}
                style={{ fontSize: "10pt" }}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatch = dispatch => ({
  setSkillFilter: filterInfo => dispatch(setSkillFilter(filterInfo)),
  clearSkillFilter: () => dispatch(clearSkillFilter()),
  setActiveFilter: filterInfo => dispatch(setActiveFilter(filterInfo)),
  clearActiveFilter: () => dispatch(clearActiveFilter())
});

export default connect(null, mapDispatch)(withStyles(styles)(SimpleSelect));
