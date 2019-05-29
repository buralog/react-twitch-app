import React from "react";
import { withRouter } from "react-router-dom";
import AsyncSelect from "react-select/lib/Async";
import _ from "lodash";
import { GetSearchOptions } from "../../services/Twitch";

const asyncControl = {
  control: base => ({
    ...base,
    height: "40px",
    fontFamily: "Roboto"
  })
};

const searchBox = {
  width: "350px",
  padding: "auto",
  margin: "-66px auto",
  marginBottom: "15px",
  fontFamily: "Roboto"
};

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      searchTerm: "",
      options: [{ value: "", label: "", makeURL: "" }]
    };
  }

  resetComponent = () => this.setState({ isLoading: false, options: [] });

  handleSelect = selectedOption => {
    if (selectedOption) {
      this.props.history.push(selectedOption.makeURL);
    }
  };

  onInputChange(value) {
    this.setState({ isLoading: true, searchTerm: value });

    setTimeout(() => {
      if (this.state.searchTerm.length < 1) return this.resetComponent();
      this.setState({ isLoading: false });
    }, 500);
  }

  loadOptions = async (value, callback) => {
    // Search user
    if (value[0] == "@" && value.length > 3) {
      let slicedValue = value.slice(1);

      try {
        let channelOptions = await GetSearchOptions("channels", slicedValue);
        let options = await channelOptions.channels.map(channel => ({
          value: channel._id,
          label: channel.display_name,
          makeURL: `/channel/${channel._id}`
        }));

        this.setState({ options });
      } catch (error) {
        console.log(error);
      }
    }
    // Search game
    if (value[0] != "@" && value.length > 3) {
      try {
        let gameOptions = await GetSearchOptions("games", value);
        let options = await gameOptions.games.map(game => ({
          value: game._id,
          label: game.name,
          makeURL: `/game/${game.name}`
        }));

        this.setState({ options });
      } catch (error) {
        console.log(error);
      }
    }

    callback(this.getOptions());
  };

  getOptions() {
    const { options } = this.state;
    return options;
  }

  render() {
    return (
      <div>
        <div style={searchBox}>
          <AsyncSelect
            isClearable={true}
            noOptionsMessage={() => "No matches found."}
            openMenuOnClick={false}
            placeholder="Search game or @user"
            styles={asyncControl}
            loadOptions={_.debounce(this.loadOptions.bind(this), 700)}
            onInputChange={_.debounce(this.onInputChange.bind(this), 700)}
            onChange={this.handleSelect}
          />
        </div>
      </div>
    );
  }
}
export default withRouter(Search);
