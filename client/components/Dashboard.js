import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import GroupCard from "./GroupCard";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 3}px 0`,
    display: "flex",
    flexDirection: "row",
    justify: "center",
    alignItems: "flex-start"
  },

  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  },
  title: {
    flexGrow: 1
  }
});

const cards = [1, 2, 3];

function Dashboard(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <main spacing={8}>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <Grid
            container
            spacing={8}
            direction="column"
            style={{ paddingRight: "3%" }}
            alignItems="center"
          >
            {" "}
            <Grid item>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                To Meet
              </Typography>
            </Grid>
            {cards.map(card => (
              <Grid item key={card} style={{ paddingBottom: "10%" }}>
                <GroupCard />
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            spacing={8}
            direction="column"
            style={{ paddingRight: "3%" }}
            alignItems="center"
          >
            <Grid item>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Day 1
              </Typography>
            </Grid>
            {[1, 2].map(card => (
              <Grid item key={card} style={{ paddingBottom: "10%" }}>
                <GroupCard />
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            spacing={8}
            direction="column"
            style={{ paddingRight: "3%" }}
            alignItems="center"
          >
            <Grid item>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Day 2
              </Typography>
            </Grid>
            {[1, 2, 3, 4].map(card => (
              <Grid item key={card} style={{ paddingBottom: "10%" }}>
                <GroupCard />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={8} direction="column" alignItems="center">
            <Grid item>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Day 3
              </Typography>
            </Grid>
            {[1, 2].map(card => (
              <Grid item key={card} style={{ paddingBottom: "10%" }}>
                <GroupCard />
              </Grid>
            ))}
          </Grid>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
