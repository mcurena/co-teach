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
import { setSkillFilter } from "../store";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
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
    }

    this.setState({
      chosen: event.target.value
    });
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
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name={this.props.filter}
                id="outlined-age-simple"
              />
            }
          >
            <MenuItem value="none">None</MenuItem>
            {this.props.options.map(option => (
              <MenuItem key={option} value={option}>
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

const mapState = state => ({
  stateFilter: state.filter
});

const mapDispatch = dispatch => ({
  setSkillFilter: filterInfo => dispatch(setSkillFilter(filterInfo))
});

export default connect(mapState, mapDispatch)(withStyles(styles)(SimpleSelect));
