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
    name: "Michelle",
    mainIdea: 4,
    causeEffect: 2,
    inference: 2,
    contextClues: 3
  },
  {
    id: 2,
    name: "Angel",
    mainIdea: 3,
    causeEffect: 3,
    inference: 4,
    contextClues: 2
  },
  {
    id: 3,
    name: "Salmon",
    mainIdea: 1,
    causeEffect: 2,
    inference: 3,
    contextClues: 3
  },
  {
    id: 4,
    name: "Tuna",
    mainIdea: 3,
    causeEffect: 4,
    inference: 2,
    contextClues: 4
  }
];

rows.sort((a, b) => {
  const keyA = a.name;
  const keyB = b.name;
  if (keyA < keyB) return -1;
  if (keyA > keyB) return 1;
  return 0;
});

function Students(props) {
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
        <FilterButton
          filter="Skills"
          options={[
            "Main Idea",
            "Cause & Effect",
            "Inference",
            "Context Clues"
          ]}
        />
      </div>

      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Main Idea</TableCell>
              <TableCell align="center">Inference</TableCell>
              <TableCell align="center">Context Clues</TableCell>
              <TableCell align="center">Cause and Effect</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(student => (
              <TableRow key={student.id}>
                <TableCell component="th" scope="row">
                  <Link to={`/students/${student.id}`}>{student.name}</Link>
                </TableCell>
                <TableCell align="center">{student.mainIdea}</TableCell>
                <TableCell align="center">{student.inference}</TableCell>
                <TableCell align="center">{student.contextClues}</TableCell>
                <TableCell align="center">{student.causeEffect}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

Students.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Students);
