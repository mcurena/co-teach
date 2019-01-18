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

const rows = [
  {
    id: 1,
    students: ["Michelle", "Angel", "Salmon", "Tuna"],
    skill: "Main Idea",
    rating: 2,
    dates: ["01/03", "01/04"],
    notes: ["Interests: Sharks and Harry Potter", "Shared text: Naomi Leon"],
    active: true
  },
  {
    id: 2,
    students: ["Angel", "Salmon", "Tuna"],
    skill: "Context Clues",
    rating: 3,
    dates: ["01/03", "01/04"],
    notes: ["Interests: Sharks and Harry Potter", "Shared text: Naomi Leon"],
    active: true
  },
  {
    id: 3,
    students: ["Michelle", "Angel", "Salmon"],
    skill: "Inferences",
    rating: 2,
    dates: ["01/03", "01/04"],
    notes: ["Interests: Sharks and Harry Potter", "Shared text: Naomi Leon"],
    active: false
  },
  {
    id: 4,
    students: ["Michelle", "Angel", "Tuna"],
    skill: "Decoding",
    rating: 1,
    dates: ["01/03", "01/04"],
    notes: ["Interests: Sharks and Harry Potter", "Shared text: Naomi Leon"],
    active: false
  }
];

function Groups(props) {
  const { classes } = props;

  return (
    <div>
      <div className={classes.filters}>
        <Typography component="h4">Filter By: </Typography>
        <FilterButton
          filter="Skills"
          options={[
            "Main Idea",
            "Cause & Effect",
            "Inference",
            "Context Clues"
          ]}
        />
        <FilterButton filter="Rating" options={[1, 2, 3, 4]} />
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
            {rows.map(group => (
              <TableRow key={group.id}>
                <TableCell align="center">
                  <Link to={`/groups/${group.id}`}>{group.id}</Link>
                </TableCell>
                <TableCell component="th" scope="row">
                  {group.students.sort().join(", ")}
                </TableCell>
                <TableCell align="center">{group.skill}</TableCell>
                <TableCell align="center">{group.rating}</TableCell>
                <TableCell align="center">
                  {group.active ? "Active" : "Completed"}
                </TableCell>
                <TableCell align="center">{group.dates.join(" - ")}</TableCell>
                <TableCell component="th" scope="row">
                  {group.notes.join(" - ")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

Groups.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Groups);
