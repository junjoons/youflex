import React from "react";
import { TextField, Paper } from "@material-ui/core";

class SearchBar extends React.Component {
  state = {
    searchTerm: ""
  };
  handleChange = event => this.setState({ searchTerm: event.target.value });
  handleSubmit = event => {
    const { searchTerm } = this.state;
    const { onFormSubmit } = this.props;
    onFormSubmit(searchTerm);
    event.preventDefault();
  };
  render() {
    return (
      <div>
        <Paper elevation={6} style={{ padding: "25px", margin: "25px" }}>
          <form onSubmit={this.handleSubmit}>
            <TextField
              fullwidth="true"
              label="Search Here"
              value={this.state.searchTerm}
              onChange={this.handleChange}
            />
          </form>
        </Paper>
      </div>
    );
  }
}

export default SearchBar;
