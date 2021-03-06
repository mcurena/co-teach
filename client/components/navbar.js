import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems } from "./NavListItems";
import {
  logout,
  loadStudents,
  loadGroups,
  loadObservations,
  groupCreatedServer,
  updateStudents
} from "../store";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  }
});

class Navbar extends React.Component {
  state = {
    open: false
  };

  async componentDidMount() {
    await Promise.all([
      this.props.loadStudents(),
      this.props.loadGroups(),
      this.props.loadObservations()
    ]);
    await this.createGroup();
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  async createGroup() {
    const availableStudents = this.props.students.filter(
      student => !student.currentlyPlaced
    );
    const nonos = [
      "id",
      "level",
      "name",
      "currentlyPlaced",
      "createdAt",
      "updatedAt",
      "teachNStudent"
    ];
    let potentialGroups = {};
    availableStudents.forEach(student => {
      for (let key in student) {
        if (!nonos.includes(key)) {
          if (!potentialGroups[key]) {
            potentialGroups[key] = {
              1: [],
              2: [],
              3: [],
              4: [],
              "Not rated": []
            };
            potentialGroups[key][student[key]].push(student.id);
          } else {
            potentialGroups[key][student[key]].push(student.id);
          }
        }
      }
    });

    const newGroups = [];
    for (let skill in potentialGroups) {
      if (potentialGroups.hasOwnProperty(skill)) {
        for (let rating in potentialGroups[skill]) {
          if (
            potentialGroups[skill].hasOwnProperty(rating) &&
            rating !== "Not rated"
          ) {
            if (potentialGroups[skill][rating].length > 3) {
              const newGroup = {
                ids: potentialGroups[skill][rating].slice(0, 4),
                skill,
                rating
              };
              newGroups.push(newGroup);
            }
          }
        }
      }
    }
    if (!newGroups.length) {
      return "";
    } else {
      await this.props.groupCreatedServer(
        newGroups[0].ids,
        newGroups[0].skill,
        newGroups[0].rating
      );
      await this.props.updateStudents(newGroups[0].ids);
    }
    this.createGroup();
  }

  render() {
    const { classes, handleClick, isLoggedIn, View } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar
            disableGutters={!this.state.open}
            className={classes.toolbar}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <img className="logo" src="/apples.png" alt="Co-Teach" />
            {"  "}
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Co.Teach
            </Typography>
            {isLoggedIn ? (
              <div>
                <center>
                  <Typography component="h3">
                    Welcome, {this.props.user.name}!
                  </Typography>
                </center>
                <center>
                  <Link
                    to="/"
                    onClick={handleClick}
                    style={{ textDecoration: "none", color: "#FFF" }}
                  >
                    <Button color="inherit">Logout</Button>
                  </Link>
                </center>
              </div>
            ) : (
              <div>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#FFF" }}
                >
                  <Button color="inherit">Login</Button>
                </Link>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <View />
        </main>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapState = state => ({
  isLoggedIn: !!state.user.id,
  students: state.students,
  user: state.user
});

const mapDispatch = dispatch => ({
  handleClick: () => dispatch(logout()),
  loadStudents: () => dispatch(loadStudents()),
  loadGroups: () => dispatch(loadGroups()),
  loadObservations: () => dispatch(loadObservations()),
  groupCreatedServer: (ids, skill, rating) =>
    dispatch(groupCreatedServer(ids, skill, rating)),
  updateStudents: ids => dispatch(updateStudents(ids))
});

export default withRouter(
  connect(mapState, mapDispatch)(withStyles(styles)(Navbar))
);

// const potentialGroups = {
//   authorsPurpose: {
//     1: [],
//     2: [],
//     3: [],
//     4: []
//   },
//   contextClues: {
//     1: [],
//     2: [],
//     3: [],
//     4: []
//   },
//   figurativeLanguage: {
//     1: [],
//     2: [],
//     3: [],
//     4: []
//   },
//   authorsPurpose: {
//     1: [],
//     2: [],
//     3: [],
//     4: []
//   },
//   mainIdea: {
//       1: [],
//       2: [],
//       3: [],
//       4: []
//   },
//   pov: {
//     1: [],
//     2: [],
//     3: [],
//     4: []
//   },
//   textFeatures: {
//     1: [],
//     2: [],
//     3: [],
//     4: []
//   },
//   textStructures: {
//     1: [],
//     2: [],
//     3: [],
//     4: []
//   },
//   theme: {
//     1: [],
//     2: [],
//     3: [],
//     4: []
//   },
//   traitsEmotions: {
//     1: [],
//     2: [],
//     3: [],
//     4: []
//   }
// };
