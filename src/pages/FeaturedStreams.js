import React, { Component } from "react";
import Loading from "../components/Loading";
import LiveStreamCard from "../components/LiveStreamCard";
import { GetStreams } from "../services/Twitch";

const style = {
  display: "flex",
  flexFlow: "wrap",
  justifyContent: "center",
  marginTop: "0px",
  marginBottom: "20px"
};

class featuredStreams extends Component {
  state = {
    streams: [],
    error: null
  };

  GetStreams = async () => {
    try {
      let streams = await GetStreams("featured");
      let featured = await streams.featured;
      this.setState({ streams: featured });
    } catch (error) {
      this.setState({ error: "error" });
      console.log(error);
    }
  };

  componentDidMount() {
    this.GetStreams();
  }

  render() {
    const { streams, error } = this.state;

    if (error) {
      return (
        <div style={{ margin: "50px", textAlign: "center" }}>
          <h4>Something went wrong.</h4>
        </div>
      );
    }

    const renderStreams = streams.length ? (
      streams.map(stream => {
        return (
          <LiveStreamCard
            key={stream.stream.channel._id}
            viewers={stream.stream.viewers}
            url={stream.stream.channel.url}
            imgURL={stream.stream.preview.medium}
            routeParam={stream.stream.channel._id}
            logoURL={stream.stream.channel.logo}
            status={stream.stream.channel.status}
            name={stream.stream.channel.display_name}
            gameName={stream.stream.channel.game}
          />
        );
      })
    ) : (
      <div style={{ marginTop: "50px" }}>
        <Loading />
      </div>
    );
    return (
      <div>
        <div style={style}>{renderStreams}</div>
      </div>
    );
  }
}

export default featuredStreams;
