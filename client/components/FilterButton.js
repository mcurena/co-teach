import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import Axios from "axios";

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
    genres: []
  };

  async componentDidMount() {
    try {
      const { data } = await Axios.get("/api/genres");
      this.setState({ genres: data });
    } catch (err) {
      console.error(err);
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div>
        <Button
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>
            <Link
              to="/allBooks"
              style={{ textDecoration: "none", color: "black" }}
            >
              Browse All Books
            </Link>
          </MenuItem>

          {this.state.genres.map(genre => (
            <MenuItem key={genre.id} onClick={this.handleClose}>
              <Link
                exact
                to={`/genres/${genre.type}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {genre.type}
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
