import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { AddGroupNote, AssignUser } from "../components";

const styles = theme => ({
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  cardContent: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing.unit * 2
  }
});

class GroupCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, group } = this.props;
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
    let skill;
    for (let key in skills) {
      if (skills[key] === group.skill) {
        skill = key;
      }
    }
    const colors = {
      1: "red",
      2: "pink",
      3: "orange"
    };
    return (
      <Card className={classes.card}>
        <CardHeader
          classes={classes.header}
          avatar={
            <Avatar
              aria-label="level"
              style={{ backgroundColor: colors[group.rating] }}
            >
              {group.rating}
            </Avatar>
          }
          action={<AssignUser group={group} />}
          title={skill}
          subheader={
            group.dates === "Pending" ? group.dates : group.dates.slice(0, 5)
          }
        />

        <CardContent>
          <center>
            <Typography component="p">
              {group.students.map(student => student.name).join(", ")}
            </Typography>
          </center>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <AddGroupNote group={group} />

          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <center>
              <Typography paragraph>Dates:</Typography>
            </center>
            <center>
              <Typography paragraph>{group.dates}</Typography>
            </center>
            <center>
              <Typography paragraph>Notes:</Typography>
            </center>
            <center>
              <Typography paragraph>{group.notes}</Typography>
            </center>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

GroupCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GroupCard);
