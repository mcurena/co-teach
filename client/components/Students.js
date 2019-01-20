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
import { clearSkillFilter } from "../store";

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
  componentWillUnmount() {
    this.props.clearSkillFilter();
  }

  render() {
    const { classes, skillFilter, students } = this.props;
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
    return (
      <div>
        <div className={classes.filters}>
          <Typography component="h4">Filter By: </Typography>
          <FilterButton filter="Skills" options={Object.keys(skills).sort()} />
        </div>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
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
              {students.map(student => (
                <TableRow key={student.id}>
                  <TableCell component="th" scope="row">
                    <Link to={`/students/${student.id}`}>{student.name}</Link>
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
  skillFilter: state.skillFilter
});

const mapDispatch = dispatch => ({
  clearSkillFilter: () => dispatch(clearSkillFilter())
});

Students.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapState, mapDispatch)(withStyles(styles)(Students));
