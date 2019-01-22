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
import { clearSkillFilter, clearActiveFilter } from "../store";
import { connect } from "react-redux";

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

class Groups extends React.Component {
  componentWillUnmount() {
    this.props.clearSkillFilter();
    this.props.clearActiveFilter();
  }

  render() {
    const { classes, skillFilter, groups, activeFilter } = this.props;
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
    let filteredGroups = groups;
    if (activeFilter.length) {
      if (activeFilter === "Yes") {
        filteredGroups = groups.filter(group => group.active);
      } else {
        filteredGroups = groups.filter(group => !group.active);
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
                <TableCell>Group #</TableCell>
                <TableCell align="center">Students</TableCell>
                <TableCell align="center">Skill</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">Active?</TableCell>
                <TableCell align="center">Dates</TableCell>
                <TableCell align="center">Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {skillFilter
                ? filteredGroups
                    .filter(group => group.skill === skills[skillFilter])
                    .map(group => (
                      <TableRow key={group.id}>
                        <TableCell align="center">{group.id}</TableCell>
                        <TableCell component="th" scope="row">
                          {group.students
                            .sort((a, b) => {
                              const keyA = a.name;
                              const keyB = b.name;
                              if (keyA < keyB) return -1;
                              if (keyA > keyB) return 1;
                              return 0;
                            })
                            .map(student => student.name)
                            .join(", ")}
                        </TableCell>
                        <TableCell align="center">{skillFilter}</TableCell>
                        <TableCell align="center">{group.rating}</TableCell>
                        <TableCell align="center">
                          {group.active ? "Active" : "Completed"}
                        </TableCell>
                        <TableCell align="center">{group.dates}</TableCell>
                        <TableCell component="th" scope="row">
                          {group.notes}
                        </TableCell>
                      </TableRow>
                    ))
                : filteredGroups.map(group => (
                    <TableRow key={group.id}>
                      <TableCell align="center">
                        <Link to={`/groups/${group.id}`}>{group.id}</Link>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {group.students
                          .reduce((accum, student) => {
                            return accum.concat([student.name]);
                          }, [])
                          .sort()
                          .join(", ")}
                      </TableCell>
                      <TableCell align="center">
                        {Object.keys(skills).find(
                          key => skills[key] === group.skill
                        )}
                      </TableCell>
                      <TableCell align="center">{group.rating}</TableCell>
                      <TableCell align="center">
                        {group.active ? "Active" : "Completed"}
                      </TableCell>
                      <TableCell align="center">{group.dates}</TableCell>
                      <TableCell component="th" scope="row">
                        {group.notes}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

Groups.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapState = state => ({
  groups: state.groups,
  skillFilter: state.skillFilter,
  activeFilter: state.activeFilter
});

const mapDispatch = dispatch => ({
  clearSkillFilter: () => dispatch(clearSkillFilter()),
  clearActiveFilter: () => dispatch(clearActiveFilter())
});

export default connect(mapState, mapDispatch)(withStyles(styles)(Groups));
