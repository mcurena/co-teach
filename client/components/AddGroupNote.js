import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { addGroupNoteServer } from "../store";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import NoteAdd from "@material-ui/icons/NoteAdd";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  }
});

class GroupNote extends React.Component {
  state = {
    open: false,
    input: ""
  };

  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  async handleSubmit() {
    await this.props.addGroupNoteServer({
      id: this.props.group.id,
      note: this.state.input
    });
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <IconButton aria-label="add" onClick={this.handleClickOpen}>
          <NoteAdd />
        </IconButton>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Note to Group</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="note"
              label="New Note"
              type="note"
              onChange={evt => this.handleChange(evt)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleSubmit()} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  addGroupNoteServer: info => dispatch(addGroupNoteServer(info))
});

export default connect(null, mapDispatch)(withStyles(styles)(GroupNote));
