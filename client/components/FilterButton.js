import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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

class FilterButton extends React.Component {
  state = {
    filter: "",
    options: [],
    labelWidth: 0
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
      filter: this.props.filter,
      options: this.props.options,
      chosen: ""
    });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { filter, options, chosen, labelWidth } = this.state;
    return (
      <div className={classes.root}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-native-simple"
          >
            {filter}
          </InputLabel>
          <Select
            native
            value={chosen}
            onChange={this.handleChange("chosen")}
            input={
              <OutlinedInput
                name={filter}
                labelWidth={labelWidth}
                id="outlined-age-native-simple"
              />
            }
          >
            <option value="" />
            {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

FilterButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FilterButton);
