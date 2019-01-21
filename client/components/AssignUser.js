import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { connect } from "react-redux";
import { assignUserServer } from "../store";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AssignUser extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  async handleSubmit() {
    await this.props.assignUserServer(this.props.group.id);
    this.handleClose();
  }

  render() {
    const { group } = this.props;
    const badge = group.user ? group.user.initials : "";
    return (
      <div>
        <IconButton onClick={this.handleClickOpen}>
          <Badge badgeContent={badge} color="primary">
            <i className="material-icons">assignment_ind</i>
          </Badge>
        </IconButton>
        {badge ? (
          <Dialog
            open={this.state.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"This group is assigned to:"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {group.user.name}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Okay
              </Button>
            </DialogActions>
          </Dialog>
        ) : (
          <Dialog
            open={this.state.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Assign yourself to this group?"}
            </DialogTitle>

            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() => this.handleSubmit()}>Yes</Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  assignUserServer: groupId => dispatch(assignUserServer(groupId))
});

export default connect(null, mapDispatch)(AssignUser);
