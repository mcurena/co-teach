import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import NoteAdd from "@material-ui/icons/NoteAdd";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import green from "@material-ui/core/colors/green";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
  avatar: {
    backgroundColor: green[500]
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  cardContent: {
    flexGrow: 1
  }
});

class GroupCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="level" className={classes.avatar}>
              2
            </Avatar>
          }
          action={
            <IconButton>
              <i className="material-icons">assignment_ind</i>
            </IconButton>
          }
          title="Cause and Effect"
          subheader="01/16/2019"
        />

        <CardContent>
          <center>
            <Typography component="p">Michelle, Angel, Salmon, Tuna</Typography>
          </center>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="add">
            <NoteAdd />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
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
            <Typography paragraph>January 3rd, January 7th</Typography>
            <center>
              <Typography paragraph>Notes</Typography>
            </center>
            <Typography paragraph>Blah blah</Typography>
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
