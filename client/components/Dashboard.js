import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import GroupCard from "./GroupCard";
import { connect } from "react-redux";

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

class Dashboard extends React.Component {
  render() {
    const { classes, groups } = this.props;

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
              {groups.map(group => {
                if (group.dates === "Pending") {
                  return (
                    <Grid item key={group.id} style={{ paddingBottom: "10%" }}>
                      <GroupCard group={group} />
                    </Grid>
                  );
                }
              })}
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
              {groups.map(group => {
                if (group.dates.length === 5) {
                  return (
                    <Grid item key={group.id} style={{ paddingBottom: "10%" }}>
                      <GroupCard group={group} />
                    </Grid>
                  );
                }
              })}
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
              {groups.map(group => {
                if (group.dates.length === 12) {
                  return (
                    <Grid item key={group.id} style={{ paddingBottom: "10%" }}>
                      <GroupCard group={group} />
                    </Grid>
                  );
                }
              })}
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
              {groups.map(group => {
                if (group.dates.length === 19) {
                  return (
                    <Grid item key={group.id} style={{ paddingBottom: "10%" }}>
                      <GroupCard group={group} />
                    </Grid>
                  );
                }
              })}
            </Grid>
          </div>
        </main>
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Created by Michelle Ureña
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Links?
          </Typography>
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
}

const mapState = state => ({
  groups: state.groups
});

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapState)(withStyles(styles)(Dashboard));
